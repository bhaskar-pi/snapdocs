"use client";

import { FileText, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/form/input";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { Toggle } from "@/components/ui/toggle";
import { DocumentModal } from "@/types/models/document";

import DocumentRow from "./document-row";
import styles from "../styles.module.css";

interface Props {
  documents: DocumentModal[];
  onRemove: (name: string) => void;
  onChange: (name: string, isRequired: boolean, index?: number) => void;
}

const normalizeName = (name: string) => name.trim().toLowerCase();

const ChooseDocuments = ({ documents, onRemove, onChange }: Props) => {
  const [openModal, setOpenModal] = useState(false);

  const [documentName, setDocumentName] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  const [editingName, setEditingName] = useState<string | undefined>(undefined);
  const [editingIndex, setEditingIndex] = useState<number | undefined>(
    undefined,
  );

  const requiredDocumentsCount = useMemo(() => {
    return documents.filter((doc) => doc.isRequired).length;
  }, [documents]);

  const closeModal = () => {
    setDocumentName("");
    setIsRequired(false);
    setEditingName(undefined);
    setEditingIndex(undefined);
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

    onChange(documentName, isRequired, editingIndex);
    closeModal();
  };

  const handleEditDocument = (doc: DocumentModal, index: number) => {
    setDocumentName(doc.name);
    setIsRequired(doc.isRequired);
    setEditingName(doc.name);
    setEditingIndex(index);
    setOpenModal(true);
  };

  const handleDeleteDocument = (name: string) => {
    onRemove(name);
    closeModal();
  };

  return (
    <>
      <div className={styles.addDocBtnContainer}>
        <div className={styles.documentRowHeader}>
          <p>{`${documents.length} document(s) added`}</p>
          <p>{`${requiredDocumentsCount} required`}</p>
        </div>

        <Button
          intent="secondary"
          icon={<Icon name={Plus} />}
          onClick={() => setOpenModal(true)}
          size="sm"
        >
          Add Document
        </Button>
      </div>
      {documents.length > 0 && (
        <div className={styles.documentRows}>
          {documents.map((doc, index) => (
            <DocumentRow
              key={doc.name}
              document={doc}
              onEdit={() => handleEditDocument(doc, index)}
              onDelete={() => handleDeleteDocument(doc.name)}
            />
          ))}
        </div>
      )}

      {documents.length === 0 && (
        <EmptyState
          icon={<Icon name={FileText} size={32} tone="muted" />}
          title="No documents added yet"
          description="Use a template or add documents manually."
        />
      )}

      {/** Modals */}
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

export default ChooseDocuments;
