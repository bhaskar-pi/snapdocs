import { FileText } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { DocumentModal } from "@/types/models/document";

import styles from "../styles.module.css";

interface Props {
  document: DocumentModal;
}

const CheckListItem = ({ document }: Props) => {
  return (
    <div className={styles.checklistItem}>
      <div>
        <Icon name={FileText} className={styles.squareDot} />
        <p className="subtitle-sm">{document.name}</p>
      </div>
      <span className={styles.requiredLabel} data-type={document.isRequired ? "required" : "optional"}>
        {document.isRequired ? "Required" : "Optional"}
      </span>
    </div>
  );
};

export default CheckListItem;
