"use client";

import { Edit, FileEdit, Trash2 } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { DocumentModal } from "@/types/models/document";

import styles from "../styles.module.css";

interface Props {
  document: DocumentModal;
  onDelete: () => void;
  onEdit: () => void;
}

const DocumentRow = ({ document, onDelete, onEdit }: Props) => {
  const isRequired = document.isRequired;

  return (
    <div className={styles.documentRow}>
      <div className={styles.documentLeft}>
        <IconBadge icon={FileEdit} variant="secondary" />
        <div className={styles.documentInfo}>
          <p className={styles.documentName}>{document.name}</p>
          <p className={`${styles.documentMeta}`}>
            {isRequired ? "Required" : "Optional"}
          </p>
        </div>
      </div>

      <div className={styles.documentRowActions}>
        <Icon tone="info" name={Edit} onClick={onEdit} />
        <Icon tone="negative" name={Trash2} onClick={onDelete} />
      </div>
    </div>
  );
};

export default DocumentRow;
