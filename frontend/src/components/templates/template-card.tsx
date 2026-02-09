"use client";
import { Edit, Ellipsis, Folders, Trash2 } from "lucide-react";

import { Template } from "@/types/models/templates";

import styles from "./templates.module.css";
import { ActionMenu } from "../ui/action-menu";
import { Icon } from "../ui/icon";

interface Props {
  template: Template;
  onEdit: () => void;
  onDelete: () => void;
}

const TemplateCard = ({ template, onDelete, onEdit }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Icon name={Folders} tone="muted" containerClassName={styles.folders} />
        <ActionMenu
          trigger={
            <Icon
              name={Ellipsis}
              tone="muted"
              size={16}
              containerClassName="ellipsis"
            />
          }
          context={
            <>
              <Icon text="Edit" name={Edit} onClick={onEdit} />
              <Icon
                tone="negative"
                text="Delete"
                name={Trash2}
                onClick={onDelete}
              />
            </>
          }
        />
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{template.title}</p>

        {template.description && (
          <p className={styles.description}>{template.description}</p>
        )}
      </div>

      <div className={styles.footer}>
        <p>{template.category}</p>
        <p>{template.documents.length} documents</p>
      </div>
    </div>
  );
};

export default TemplateCard;
