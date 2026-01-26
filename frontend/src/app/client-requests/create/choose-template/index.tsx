"use client";

import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/select";
import { Modal } from "@/components/ui/modal";
import { Toggle } from "@/components/ui/toggle";
import { Document } from "@/types/models/document";

import styles from "../create.module.css";
import DocumentRow from "./document-row";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  documents: Document[];
  onChange: (name: string, isRequired: boolean) => void;
  onRemove: (name: string) => void;
}

enum TemplateMode {
  USE_TEMPLATE = "use_template",
  ADD_DOCUMENTS = "add_documents",
}

const normalizeName = (name: string) => name.trim().toLowerCase();

const ChooseTemplate = ({
  onNext,
  onPrevious,
  documents = [],
  onChange,
  onRemove,
}: Props) => {
  const [mode, setMode] = useState<TemplateMode>(TemplateMode.ADD_DOCUMENTS);

  const [openModal, setOpenModal] = useState(false);
  const [documentName, setDocumentName] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const [editingName, setEditingName] = useState<string | null>(null);

  const requiredDocumentsCount = useMemo(() => {
    return documents.filter((doc) => doc.isRequired).length;
  }, [documents]);

  const closeModal = () => {
    setDocumentName("");
    setIsRequired(false);
    setEditingName(null);
    setOpenModal(false);
  };

  const handleSaveDocument = () => {
    if (!documentName.trim()) {
      toast.error("Document name is required.");
      return;
    }

    const duplicate = documents.some(
      (doc) =>
        normalizeName(doc.name) === normalizeName(documentName) &&
        doc.name !== editingName,
    );

    if (duplicate) {
      toast.error("A document with this name already exists.");
      return;
    }

    onChange(documentName, isRequired);

    closeModal();
  };

  const handleEditDocument = (doc: Document) => {
    setDocumentName(doc.name);
    setIsRequired(doc.isRequired);
    setEditingName(doc.name);
    setOpenModal(true);
  };

  const handleDeleteDocument = (name: string) => {
    onRemove(name);
    closeModal();
  };

  return (
    <>
      <div className={styles.stepHeader}>
        <h1>Choose Template</h1>
        <p>
          Select a template with a predefined checklist or manually add required
          documents.
        </p>
      </div>

      <div className={styles.stepActions}>
        <div
          data-active={mode === TemplateMode.ADD_DOCUMENTS}
          onClick={() => setMode(TemplateMode.ADD_DOCUMENTS)}
        >
          Add Documents Manually
        </div>
        <div
          data-active={mode === TemplateMode.USE_TEMPLATE}
          onClick={() => setMode(TemplateMode.USE_TEMPLATE)}
        >
          Use Template
        </div>
      </div>

      {mode === TemplateMode.USE_TEMPLATE && (
        <form className={styles.stepForm}>
          <Select
            id="template"
            label="Template"
            placeholder="Select a template"
            options={[]}
          />
        </form>
      )}

      {mode === TemplateMode.ADD_DOCUMENTS && (
        <>
          <div>
            {documents.length > 0 && (
              <div className={styles.documentRowHeader}>
                <p>{`${documents.length} document(s) added`}</p>
                <p>{`${requiredDocumentsCount} required`}</p>
              </div>
            )}
          </div>
          <div className={styles.documentRows}>
            {documents.map((doc) => (
              <DocumentRow
                key={doc.name}
                document={doc}
                onEdit={() => handleEditDocument(doc)}
                onDelete={() => handleDeleteDocument(doc.name)}
              />
            ))}
          </div>

          <div className={styles.addDocBtnContainer}>
            <Button
              icon={<Icon name={Plus} className={styles.addIcon} />}
              className={styles.addDocBtn}
              onClick={() => setOpenModal(true)}
            >
              {documents.length === 0 ? "Add Document" : "Add Another Document"}
            </Button>

            {documents.length === 0 && (
              <p>Click the button above to start adding documents</p>
            )}
          </div>
        </>
      )}

      <div className={styles.stepFooter}>
        <Button
          variant="secondary"
          icon={<Icon name={ArrowLeft} />}
          onClick={onPrevious}
        >
          Previous
        </Button>
        <Button
          iconPosition="right"
          icon={<Icon name={ArrowRight} tone="white" />}
          onClick={onNext}
        >
          Next
        </Button>
      </div>

      <Modal
        title={editingName ? "Edit Document" : "Add Document"}
        open={openModal}
        size="small"
        onClose={closeModal}
        onSave={{
          label: editingName ? "Update" : "Add",
          onClick: handleSaveDocument,
        }}
        onDelete={
          editingName
            ? {
                label: "Delete",
                onClick: () => handleDeleteDocument(editingName),
              }
            : undefined
        }
      >
        <div className={styles.modalContainer}>
          <Input
            id="document-name"
            label="Document Name"
            placeholder="e.g., Passport, Tax Return"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
          />

          <Toggle
            label="Required Document"
            description="Client must provide this document"
            checked={isRequired}
            onChange={setIsRequired}
          />
        </div>
      </Modal>
    </>
  );
};

export default ChooseTemplate;
