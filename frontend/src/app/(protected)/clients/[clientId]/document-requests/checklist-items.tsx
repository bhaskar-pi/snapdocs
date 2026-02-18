import { Download, Eye, FileText } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { ChecklistItem } from "@/types/models/document";
import { formatDate } from "@/utils/date";
import { formatEnumLabel } from "@/utils/input";
import { getStatusClassName } from "@/utils/misc";

import styles from "./document-requests.module.css";

interface Props {
  items: ChecklistItem[];
}

const ChecklistItems = ({ items }: Props) => {
  return (
    <div className={styles.checklist}>
      {items.map((item) => {
        const document = item.documents[0];

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
                    onClick={() => window.open(document.storagePath)}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    className={styles.iconButton}
                    aria-label="Download document"
                    onClick={() =>
                      window.open(`${document.storagePath}?download=1`)
                    }
                  >
                    <Download size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChecklistItems;
