"use client";

import { Modal } from "@/components/ui/modal";

import styles from "./document-preview.module.css";

interface Props {
  title: string;
  open: boolean;
  url: string | null;
  onClose: () => void;
}

const IMAGE_EXTENSIONS = /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i;

const DocumentPreviewModal = ({ open, url, onClose, title }: Props) => {
  return (
    <Modal
      type="primary"
      open={open}
      onClose={onClose}
      size="xlarge"
      title={title}
      onSave={{
        label: "Close",
        onClick: onClose,
      }}
    >
      <div className={styles.previewWrapper}>
        {url ? (
          IMAGE_EXTENSIONS.test(url) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={url}
              alt="Document preview"
              className={styles.previewImage}
            />
          ) : (
            <iframe
              src={url}
              className={styles.previewIframe}
              title="Document preview"
            />
          )
        ) : (
          <p className={styles.loadingText}>Loading...</p>
        )}
      </div>
    </Modal>
  );
};

export default DocumentPreviewModal;
