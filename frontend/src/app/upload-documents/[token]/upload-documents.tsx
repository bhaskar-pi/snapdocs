"use client";

import {
  CircleCheck,
  Edit,
  FileText,
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
import { formatDate } from "@/utils/date";

import styles from "../upload-documents.module.css";

export default function UploadDocuments() {
  const params = useParams();
  const token = params.token as string;

  const { data: request, isLoading } = useGetUploadChecklistItems(token);
  const requestDetails = request?.data;

  const uploadDocument = useUploadDocument(token);
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null);

  const handleFileSelect = async (
    file: File,
    checklistItemId: string,
    documentId?: string,
  ) => {
    setUploadingItemId(checklistItemId);

    uploadDocument.mutate(
      { file, checklistItemId, documentId },
      {
        onSettled: () => {
          setUploadingItemId(null);
        },
      },
    );
  };

  if (isLoading && !requestDetails) {
    return <Loader open />;
  }

  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <div className={styles.container}>
          <div className={styles.header}>
            <Logo description="Secure Document Collection" />
          </div>
        </div>
      </div>

      <div className={styles.bodyWrapper}>
        <div className={styles.container}>
          <div className={styles.body}>
            <div>
              <div className={styles.user}>
                <Icon
                  size={16}
                  name={User}
                  tone="muted"
                  strokeWidth={2}
                  aria-hidden="true"
                />

                <div className={styles.meta}>
                  <span className={styles.requestedBy}>
                    Requested by{" "}
                    <strong className={styles.userName}>
                      {requestDetails?.userName ?? "Unknown"}
                    </strong>
                  </span>

                  {requestDetails?.dueDate && (
                    <>
                      <span className={styles.separator} aria-hidden="true">
                        •
                      </span>

                      <time
                        className={styles.dueDate}
                        dateTime={`${requestDetails.dueDate}`}
                      >
                        Due on {formatDate(requestDetails.dueDate)}
                      </time>
                    </>
                  )}
                </div>
              </div>

              <div>
                <h1 className={styles.title}>{requestDetails?.requestTitle}</h1>
              </div>

              <p className={styles.description}>
                Hi <span>{requestDetails?.clientName} 👋</span>, please upload
                the following documents at your earliest convenience.
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
                Documents ({requestDetails?.checklistItems.length ?? 0})
              </p>
              <ProgressBar
                variant="success"
                completed={
                  requestDetails?.checklistItems.filter(
                    (i) => i.status === ChecklistItemStatus.RECEIVED,
                  ).length ?? 0
                }
                total={requestDetails?.checklistItems.length ?? 0}
              />
            </div>

            <div className={styles.docs}>
              {requestDetails?.checklistItems.map((item) => {
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
                        variant={isReceived ? "success" : "secondary"}
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
                      className={isReceived ? styles.replaceBtn : ""}
                      isLoading={isUploading}
                      id="file-upload"
                      icon={<Icon name={isReceived ? Edit : Upload} />}
                      label={isReceived ? "Replace" : "Upload"}
                      onFileSelect={(file) =>
                        handleFileSelect(file, item.id, item.documents[0]?.id)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.container}>
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
    </div>
  );
}
