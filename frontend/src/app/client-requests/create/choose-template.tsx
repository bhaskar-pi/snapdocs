"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/common/button";
import { Icon } from "@/components/common/icon";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Modal } from "@/components/modal";
import { Toggle } from "@/components/toggle";

import styles from "./create.module.css";

enum TemplateMode {
  USE_TEMPLATE = "use_template",
  ADD_DOCUMENTS = "add_documents",
}

interface Document {
  name: string;
  isRequired: boolean;
}

const ChooseTemplate = () => {
  const [mode, setMode] = useState<TemplateMode>(TemplateMode.USE_TEMPLATE);
  const [openModal, setOpenModal] = useState(false);
  const [documents, setDocuments] = useState<Document[]>([]);

  return (
    <>
      <div className={styles.stepHeader}>
        <h1>Choose Template</h1>
        <p>
          Select a template with a predefined document checklist or manually add
          required documents.
        </p>
      </div>

      <div className={styles.stepActions}>
        <div
          data-active={mode === TemplateMode.USE_TEMPLATE}
          onClick={() => setMode(TemplateMode.USE_TEMPLATE)}
        >
          Use Template
        </div>

        <div
          data-active={mode === TemplateMode.ADD_DOCUMENTS}
          onClick={() => setMode(TemplateMode.ADD_DOCUMENTS)}
        >
          Add Documents Manually
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
          {documents.map((doc, index) => (
            <div key={index}>
              <p>{doc.name}</p>
            </div>
          ))}
          <div className={styles.addDocBtnContainer}>
            <Button
              icon={<Icon name={Plus} className={styles.addIcon} />}
              className={styles.addDocBtn}
              onClick={() => setOpenModal(true)}
            >
              Add Document
            </Button>
            <p>
              Click the button above to start adding documents to your request
            </p>
          </div>
        </>
      )}

      {/** Modals */}

      <Modal
        title="Add Document"
        open={openModal}
        size="small"
        onClose={() => setOpenModal(false)}
        onSave={{ label: "Add", onClick: () => {} }}
      >
        <div className={styles.modalContainer}>
          <Input
            id="document-name"
            label="Document Name"
            placeholder="e.g., Passport, Tax Return, Bank Statement"
          />

          <Toggle
            label="Is Required"
            description="Client must provide this document"
          />
        </div>
      </Modal>
    </>
  );
};

export default ChooseTemplate;
