"use client";

import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { ChecklistItemStatus } from "@/types/enums/request";
import { DocumentRequest } from "@/types/models/document";
import { formatDate } from "@/utils/date";
import { formatEnumLabel } from "@/utils/input";
import { getStatusClassName } from "@/utils/misc";

import ChecklistItems from "./checklist-items";
import styles from "./document-requests.module.css";

interface Props {
  request: DocumentRequest;
}

const RequestBox = ({ request }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const receivedCount = (request?.checklistItems ?? []).filter(
    (item) => item.status === ChecklistItemStatus.RECEIVED,
  ).length;

  return (
    <div className={`card ${styles.requestCard}`}>
      <div
        className={styles.requestBoxHeader}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
      >
        <div className={styles.requestBoxLeft}>
          <div className={styles.requestTitleRow}>
            <h2 className={styles.requestBoxTitle}>{request.title}</h2>

            <span
              className={`status status-${getStatusClassName(request.status)}`}
            >
              {formatEnumLabel(request.status)}
            </span>
          </div>

          <p className={styles.requestMeta}>
            Created {formatDate(request.createdAt)}
          </p>
        </div>

        <div className={styles.requestBoxRight}>
          {request.dueDate && (
            <div className={styles.dueDate}>
              <Icon name={Clock} size={14} tone="muted" />
              <span>Due {formatDate(request.dueDate)}</span>
            </div>
          )}

          <button type="button" className={styles.toggleButton}>
            <Icon
              size={18}
              name={isOpen ? ChevronUp : ChevronDown}
              tone="muted"
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.requestBody}>
          <div className={styles.documentsHeader}>
            Documents ({receivedCount}/{request?.checklistItems?.length}{" "}
            received)
          </div>

          <ChecklistItems items={request.checklistItems} />
        </div>
      )}
    </div>
  );
};

export default RequestBox;
