import { Download, Eye, FileText } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { ChecklistItemStatus } from "@/types/enums/request";
import { ChecklistItem } from "@/types/models/document";
import { formatDate } from "@/utils/date";
import { formatEnumLabel } from "@/utils/input";
import { getStatusClassName } from "@/utils/misc";

import styles from "../styles.module.css";

interface Props {
  items: ChecklistItem[];
}

const ChecklistItems = ({ items }: Props) => {
  return (
    <div className={styles.checklist}>
      {items.map((item) => {
        const document = item.documents[0]; // assuming single doc per item

        return (
          <div key={item.id} className={styles.checklistRow}>
            <div className={styles.checklistInfo}>
              <Icon name={FileText} size={16} tone="muted" />
              <div>
                <p className={styles.docName}>{item.name}</p>

                {document && (
                  <p className={styles.uploadedAt}>
                    Uploaded {formatDate(document?.uploadedAt)}
                  </p>
                )}
              </div>
            </div>

            <div className={styles.checklistActions}>
              <span
                className={`status ${item.status === ChecklistItemStatus.RECEIVED && getStatusClassName(ChecklistItemStatus.RECEIVED)}`}
              >
                {formatEnumLabel(item.status)}
              </span>

              {document && (
                <>
                  <button
                    className={styles.iconBtn}
                    aria-label="View document"
                    onClick={() => window.open(document.storagePath)}
                  >
                    <Eye size={16} />
                  </button>

                  <button
                    className={styles.iconBtn}
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
