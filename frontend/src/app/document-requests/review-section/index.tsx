import { Input } from "@/components/ui/form/input";
import { TextArea } from "@/components/ui/form/text-area";
import { Document } from "@/types/models/document";

import styles from "../styles.module.css";
import CheckListItem from "./checklist-item";
import SectionFooter from "../section-footer";
import SectionHeader from "../section-header";

interface Props {
  onSendRequest: () => void;
  onPrevious: () => void;
  onChange: (prop: string, value: string | Date) => void;
  documents: Document[];
  clientName: string;
  isLoading?: boolean;
}

const ReviewAndSend = ({
  onSendRequest,
  onPrevious,
  onChange,
  documents = [],
  clientName,
  isLoading,
}: Props) => {
  return (
    <>
      <SectionHeader
        title="Review & Send"
        description="Review the request details before sending"
      />

      <div className={styles.reviewForm}>
        <Input
          id="title"
          label="Request Title"
          placeholder="e.g., ITR Filing 2026"
          fieldClassName={styles.stepFormInput}
          onChange={(e) => onChange("title", e.target.value)}
        />
        <Input
          id="due-date"
          label="Due Date"
          placeholder=""
          type="date"
          fieldClassName={styles.stepFormInput}
          onChange={(e) => onChange("dueDate", new Date(e.target.value))}
        />
        <TextArea
          id="description"
          label="Message"
          placeholder="Add a personal message to the client..."
          fieldClassName={styles.stepFormInput}
          onChange={(e) => onChange("description", e.target.value)}
        />
      </div>

      <div className={styles.checklistReview}>
        <h1>{`Document CheckList (${documents.length} items)`}</h1>
        {documents.map((doc) => (
          <CheckListItem key={doc.name} document={doc} />
        ))}
      </div>

      <div className={styles.sendingNote}>
        Sending to: <span>{`${clientName}`}</span>
      </div>

      <SectionFooter
        text={isLoading ? "Sending Request..." : "Send Request"}
        isLoading={isLoading}
        onNext={onSendRequest}
        onPrevious={onPrevious}
      />
    </>
  );
};

export default ReviewAndSend;
