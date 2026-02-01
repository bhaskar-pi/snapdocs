"use Client";

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
  const [viewRequests, setViewRequests] = useState<string[]>([]);

  const receivedCount = (request?.checklistItems ?? []).filter(
    (item) => item.status === ChecklistItemStatus.RECEIVED,
  ).length;
  const pendingCount = (request?.checklistItems ?? []).filter(
    (item) => item.status === ChecklistItemStatus.PENDING,
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
          <p className={styles.dueDate}>
            <Icon name={Clock} size={16} />
            <span>
              Due: {request.dueDate ? formatDate(request.dueDate) : "—"}
            </span>
          </p>
          <Icon
            size={22}
            name={viewRequests.includes(request.id) ? ChevronUp : ChevronDown}
            containerClassName={styles.closeToggle}
            onClick={() =>
              setViewRequests((prev) =>
                viewRequests.includes(request.id)
                  ? prev.filter((id) => id !== request.id)
                  : [...prev, request.id],
              )
            }
          />
        </div>
      </div>

      {viewRequests.includes(request.id) && (
        <>
          <p className="line"></p>

          <div className={styles.documentsHeader}>
            <p>{`Documents (${receivedCount}/${pendingCount} received)`}</p>
          </div>

          <ChecklistItems items={request.checklistItems} />
        </>
      )}
    </div>
  );
};

export default RequestBox;
