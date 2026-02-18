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
        <p>{document.name}</p>
      </div>
      <span>{document.isRequired ? "Required" : "Optional"}</span>
    </div>
  );
};

export default CheckListItem;
