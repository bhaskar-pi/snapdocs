import { CircleCheck, FileText, Grip, SquareCheck, SquareCheckBig, SquareDot } from "lucide-react";

import { Icon } from "@/components/common/icon";
import { Document } from "@/types/models/document";

import styles from "../create.module.css";


interface Props {
  document: Document;
}

const CheckListItem = ({ document }: Props) => {
  return (
    <div className={styles.checklistItem}>
      <div>
        <Icon name={FileText} className={styles.squareDot} />
        <p>{document.name}</p>
      </div>
      <button>{document.isRequired ? "Required" : "Optional"}</button>
    </div>
  );
};

export default CheckListItem;
