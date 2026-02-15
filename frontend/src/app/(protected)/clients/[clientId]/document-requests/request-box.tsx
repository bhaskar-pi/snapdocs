"use client";

import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";

import { Icon } from "@/components/ui/icon";
import { ChecklistItemStatus } from "@/types/enums/request";
import { DocumentRequest } from "@/types/models/document";
import { formatDate } from "@/utils/date";
import { formatEnumLabel } from "@/utils/input";
import { getStatusClassName } from "@/utils/misc";

import styles from "../styles.module.css";
import ChecklistItems from "./checklist-items";

interface Props {
  request: DocumentRequest;
}

const RequestBox = ({ request }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const receivedCount = (request?.checklistItems ?? []).filter(
    (item) => item.status === ChecklistItemStatus.RECEIVED,
  ).length;

  return (
    <div key={request.id} className={`card ${styles.requestCard}`}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.titleRow}>
            <h2>{request.title}</h2>
            <span className={`status ${getStatusClassName(request.status)}`}>
              {formatEnumLabel(request.status)}
            </span>
          </div>

          <p className={styles.meta}>
            Created: {formatDate(request.createdAt)}
          </p>
        </div>

        <div className={styles.headerRight}>
          {request.dueDate && (
            <p className={styles.dueDate}>
              <Icon name={Clock} size={16} />
              <span>Due: {formatDate(request.dueDate)}</span>
            </p>
          )}
          <Icon
            size={22}
            name={isOpen ? ChevronUp : ChevronDown}
            containerClassName={styles.closeToggle}
            onClick={() => setIsOpen((prev) => !prev)}
          />
        </div>
      </div>

      {isOpen && (
        <>
          <p className="line"></p>

          <div className={styles.documentsHeader}>
            <p>{`Documents (${receivedCount}/${request?.checklistItems?.length} received)`}</p>
          </div>

          <ChecklistItems items={request.checklistItems} />
        </>
      )}
    </div>
  );
};

export default RequestBox;
