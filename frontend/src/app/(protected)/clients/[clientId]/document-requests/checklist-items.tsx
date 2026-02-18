"use client";

import { Download, Eye, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

import DocumentPreviewModal from "@/components/document-preview";
import { Icon } from "@/components/ui/icon";
import { useGetDocumentUrl } from "@/hooks/data/documents/use-documents";
import { ChecklistItem } from "@/types/models/document";
import { formatDate } from "@/utils/date";
import { formatEnumLabel } from "@/utils/input";
import { getStatusClassName } from "@/utils/misc";

import styles from "./document-requests.module.css";

interface Props {
  items: ChecklistItem[];
}

const ChecklistItems = ({ items }: Props) => {
  const getDocumentUrl = useGetDocumentUrl();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [selectedDocToPreview, setSelectedDocToPreview] = useState("");

  const [loadingAction, setLoadingAction] = useState<{
    id: string;
    action: "view" | "download";
  } | null>(null);

  const handleView = async (documentId: string, name: string) => {
    try {
      setLoadingAction({ id: documentId, action: "view" });

      const response = await getDocumentUrl.mutateAsync(documentId);

      setPreviewUrl(response?.url || "");
      setSelectedDocToPreview(name);
      setIsPreviewOpen(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDownload = async (documentId: string, fileName: string) => {
    try {
      setLoadingAction({ id: documentId, action: "download" });

      const response = await getDocumentUrl.mutateAsync(documentId);

      const blob = await fetch(response.url || "").then((r) => r.blob());
      const blobUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");
      anchor.href = blobUrl;
      anchor.download = fileName;
      anchor.click();

      URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(null);
    }
  };

  const handleClosePreview = () => {
    setPreviewUrl(null);
    setIsPreviewOpen(false);
    setSelectedDocToPreview("");
  };

  return (
    <div className={styles.checklist}>
      {items.map((item) => {
        const document = item.documents[0];
        const isViewLoading =
          loadingAction?.id === document.id && loadingAction.action === "view";
        const isDownloadLoading =
          loadingAction?.id === document.id &&
          loadingAction.action === "download";

        return (
          <div key={item.id} className={styles.checklistRow}>
            <div className={styles.checklistInfo}>
              <Icon name={FileText} size={16} tone="muted" />
              <div>
                <p className={styles.docName}>{item.name}</p>

                {document && (
                  <p className={styles.uploadedAt}>
                    Uploaded {formatDate(document.updatedAt)}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.checklistActions}>
              <span
                className={`status status-${getStatusClassName(item.status)}`}
              >
                {formatEnumLabel(item.status)}
              </span>

              {document && (
                <>
                  <button
                    className={styles.iconButton}
                    aria-label="View document"
                    onClick={() => handleView(document.id, item.name)}
                  >
                    {isViewLoading ? (
                      <Loader2 size={16} className="spinner" />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>

                  <button
                    className={styles.iconButton}
                    aria-label="Download document"
                    onClick={() => handleDownload(document.id, item.name)}
                  >
                    {isDownloadLoading ? (
                      <Loader2 size={16} className="spinner" />
                    ) : (
                      <Download size={16} />
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}

      <DocumentPreviewModal
        title={`${selectedDocToPreview}`}
        open={isPreviewOpen}
        url={previewUrl}
        onClose={handleClosePreview}
      />
    </div>
  );
};

export default ChecklistItems;
