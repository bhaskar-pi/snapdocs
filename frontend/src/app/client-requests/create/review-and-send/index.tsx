import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { TextArea } from "@/components/ui/form/text-area";
import { Icon } from "@/components/ui/icon";
import { Document } from "@/types/models/document";

import styles from "../create.module.css";
import CheckListItem from "./checklist-item";

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
      <div className={styles.stepHeader}>
        <h1>Review & Send</h1>
        <p>Review the request details before sending</p>
      </div>

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

      <div className={styles.stepFooter}>
        <Button
          intent="secondary"
          icon={<Icon name={ArrowLeft} />}
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          loading={isLoading}
          iconPosition="left"
          icon={<Icon name={Check} />}
          onClick={onSendRequest}
        >
          Send Request
        </Button>
      </div>
    </>
  );
};

export default ReviewAndSend;
