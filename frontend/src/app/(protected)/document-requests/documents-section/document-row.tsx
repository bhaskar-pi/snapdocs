"use client";

import { Edit, Trash2 } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { DocumentModal } from "@/types/models/document";

import styles from "../styles.module.css";

interface Props {
  document: DocumentModal;
  onDelete: () => void;
  onEdit: () => void;
}

const DocumentRow = ({ document, onDelete, onEdit }: Props) => {
  const isRequired = document.isRequired;
  const letter = document.name.trim().charAt(0).toUpperCase();

  return (
    <div className={styles.documentRow}>
      <div className={styles.documentLeft}>
        <div
          className={`${styles.documentLetterBadge} ${
            isRequired ? styles.requiredBadge : styles.optionalBadge
          }`}
        >
          {letter}
        </div>

        <div className={styles.documentInfo}>
          <p className={styles.documentName}>{document.name}</p>
          <p className={`${styles.documentMeta}`}>
            {isRequired ? "Required" : "Optional"}
          </p>
        </div>
      </div>

      <div className={styles.documentRowActions}>
        <Icon
          name={Edit}
          containerClassName={styles.editButtonContainer}
          className={styles.editButton}
          onClick={onEdit}
        />

        <Icon
          name={Trash2}
          size={18}
          className={styles.deleteButton}
          containerClassName={styles.deleteButtonContainer}
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default DocumentRow;
