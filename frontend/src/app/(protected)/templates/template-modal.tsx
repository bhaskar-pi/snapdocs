import DocumentRow from "@/components/documents/document-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { TextArea } from "@/components/ui/form/text-area";
import { Modal } from "@/components/ui/modal";
import { Template } from "@/types/models/templates";

import styles from "./templates.module.css";

interface Props {
  isLoading: boolean;
  title: string;
  open: boolean;
  documentName: string;
  template?: Template;
  onClose: () => void;
  onDelete?: (id: string) => void;
  onDismiss: () => void;
  onSave: () => void;
  setDocumentName: (name: string) => void;
  onAddDocument: (name: string) => void;
  onToggleRequired: (name: string, required: boolean) => void;
  onDeleteDocument: (name: string) => void;
  onChangeTemplate: (prop: string, value: string) => void;
}

const TemplateModal = ({
  isLoading,
  title,
  documentName,
  open,
  template,
  setDocumentName,
  onClose,
  onDelete,
  onDismiss,
  onSave,
  onAddDocument,
  onToggleRequired,
  onDeleteDocument,
  onChangeTemplate,
}: Props) => {
  return (
    <Modal
      title={title}
      size="medium"
      open={open}
      onClose={onClose}
      onDelete={
        onDelete
          ? {
              label: "Delete",
              onClick: () => onDelete(template?.id || ""),
              disabled: isLoading,
            }
          : undefined
      }
      onDismiss={{
        label: "Cancel",
        onClick: () => onDismiss(),
        disabled: isLoading,
      }}
      onSave={{
        label: "Save",
        onClick: onSave,
        disabled: isLoading,
      }}
    >
      <form className="base-form">
        <div className="base-two-in-row">
          <Input
            label="Title"
            id="template-title"
            placeholder="e.g. Home Loan Documents"
            value={template?.title ?? ""}
            onChange={(e) => onChangeTemplate("title", e.target.value)}
          />
          <Input
            label="Category"
            id="template-category"
            placeholder="e.g. Loans, Insurance, HR, Legal"
            value={template?.category ?? ""}
            onChange={(e) => onChangeTemplate("category", e.target.value)}
          />
        </div>
        <TextArea
          id="description"
          label="Description"
          placeholder="Briefly describe when and why this template is used..."
          fieldClassName="input-width"
          value={template?.description ?? ""}
          onChange={(e) => onChangeTemplate("description", e.target.value)}
        />
        <div className={styles.addDocumentInput}>
          <Input
            label="Documents"
            id="add-document"
            placeholder="e.g. PAN Card, Salary Slips, ID Proof"
            fieldClassName="input-width"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
          />
          <Button
            type="button"
            className={styles.addButton}
            onClick={() => onAddDocument(documentName)}
            disabled={!documentName.trim()}
          >
            Add
          </Button>
        </div>
        <div className={styles.documentsContainer}>
          {template?.documents?.map((doc) => (
            <DocumentRow
              key={doc.name}
              name={doc.name}
              isRequired={doc.isRequired}
              onToggle={(isRequired) => onToggleRequired(doc.name, isRequired)}
              onDelete={() => onDeleteDocument(doc.name)}
            />
          ))}
        </div>
      </form>
    </Modal>
  );
};

export default TemplateModal;
