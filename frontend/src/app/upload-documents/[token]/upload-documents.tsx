"use client";

import {
  CircleCheck,
  FileText,
  Replace,
  Shield,
  Upload,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import { FileUploadButton } from "@/components/ui/file-upload";
import { Icon } from "@/components/ui/icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { Loader } from "@/components/ui/loader";
import { Logo } from "@/components/ui/logo";
import { ProgressBar } from "@/components/ui/progress-bar";
import {
  useGetUploadChecklistItems,
  useUploadDocument,
} from "@/hooks/data/documents/use-documents";
import { ChecklistItemStatus } from "@/types/enums/request";

import styles from "../upload-documents.module.css";

export default function UploadDocuments() {
  const params = useParams();
  const token = params.token as string;

  const { data, isLoading } = useGetUploadChecklistItems(token);
  const uploadDocument = useUploadDocument(token);

  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null);

  const handleFileSelect = async (
    checklistItemId: string,
    requestId: string,
    file: File,
    documentId?: string,
  ) => {
    setUploadingItemId(checklistItemId);

    uploadDocument.mutate(
      { file, requestId, checklistItemId, documentId },
      {
        onSettled: () => {
          setUploadingItemId(null);
        },
      },
    );
  };

  if (isLoading) {
    return <Loader open />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <Logo description="Secure Document Collection" />
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.user}>
          <Icon size={16} name={User} tone="muted" strokeWidth={2} />
          <p>
            Requested by <span>{data?.requestedBy}</span>
          </p>
        </div>

        <div>
          <h1 className={styles.title}>{data?.requestTitle}</h1>
          <p className={styles.description}>
            Hi <span>{data?.clientName} 👋</span>, please upload the following
            documents at your earliest convenience.
          </p>
        </div>

        <div className={styles.disclosure}>
          <Icon
            containerClassName={styles.shield}
            name={Shield}
            tone="success"
            size={22}
          />
          <p>
            <span>Your files are safe.</span> <br />
            All uploads are encrypted end-to-end and only accessible by your
            advisor.
          </p>
        </div>

        <div className={styles.progressRow}>
          <p className={styles.progressLabel}>
            Documents ({data?.checklistItems.length ?? 0})
          </p>
          <ProgressBar
            variant="success"
            completed={
              data?.checklistItems.filter(
                (i) => i.status === ChecklistItemStatus.RECEIVED,
              ).length ?? 0
            }
            total={data?.checklistItems.length ?? 0}
          />
        </div>

        <div className={styles.docs}>
          {data?.checklistItems.map((item) => {
            const isReceived = item.status === ChecklistItemStatus.RECEIVED;
            const isUploading = uploadingItemId === item.id;

            return (
              <div
                key={item.id}
                className={`${styles.docCard} ${
                  isReceived ? styles.docCardSelected : ""
                }`}
              >
                <div className={styles.docInfo}>
                  <IconBadge
                    icon={isReceived ? CircleCheck : FileText}
                    size="lg"
                    variant={isReceived ? "success" : "default"}
                  />
                  <div className={styles.docText}>
                    <h3 className={styles.docTitle}>
                      {item.name}
                      {item.isRequired && !isReceived && (
                        <span className={styles.isRequired}>REQUIRED</span>
                      )}
                      {isReceived && (
                        <span className={styles.isUploaded}>UPLOADED</span>
                      )}
                    </h3>
                    <p
                      data-type={isReceived ? "file" : "hint"}
                      className={styles.docHint}
                    >
                      {isReceived
                        ? item.documents[0]?.fileName
                        : "Click upload · PDF, JPG, PNG, DOC · Max 10MB"}
                    </p>
                  </div>
                </div>

                <FileUploadButton
                  isLoading={isUploading}
                  id="file-upload"
                  icon={<Icon name={isReceived ? Replace : Upload} />}
                  label={isReceived ? "Replace" : "Upload"}
                  onFileSelect={(file) =>
                    handleFileSelect(
                      item.id,
                      item.requestId,
                      file,
                      item.documents[0]?.id,
                    )
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <p>Secure document collection powered by SnapDocs.</p>
            </div>

            <div className={styles.footerMeta}>
              <div className={styles.footerItem}>
                <Icon name={Shield} size={16} tone="success" />
                <span>256-bit SSL Encryption</span>
              </div>
              <div className={styles.footerItem}>
                <Icon name={CircleCheck} size={16} tone="success" />
                <span>Secure Cloud Storage</span>
              </div>
            </div>
          </div>

          <div className={styles.footerBottom}>
            <p>
              Need help? Contact your advisor or email{" "}
              <a href="mailto:support@snapdocs.com">support@snapdocs.com</a>
            </p>
            <div className={styles.footerLinks}>
              <a href="/privacy" target="_blank">
                Privacy Policy
              </a>
              <a href="/terms" target="_blank">
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
