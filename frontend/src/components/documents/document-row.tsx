import { FileText, Trash2 } from "lucide-react";

import styles from "./documents.module.css";
import { Icon } from "../ui/icon";
import { ToggleSwitch } from "../ui/toggle";

interface Props {
  name: string;
  isRequired: boolean;
  onToggle: (required: boolean) => void;
  onDelete: () => void;
}

const DocumentRow = ({ name, isRequired, onToggle, onDelete }: Props) => {
  return (
    <div className={styles.documentRow}>
      <div className={styles.documentRowLeft}>
        <Icon name={FileText} tone="muted" />
        <p>{name}</p>
      </div>

      <div className={styles.documentRowRight}>
        <p>{isRequired ? "Required" : "Optional"}</p>
        <ToggleSwitch checked={isRequired} onChange={onToggle} />
        <Icon
          name={Trash2}
          size={16}
          tone="muted"
          className="deleteIcon"
          onClick={onDelete}
        />
      </div>
    </div>
  );
};

export default DocumentRow;
