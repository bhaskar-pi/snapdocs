"use client";

import { useState } from "react";

import { DocumentModal } from "@/types/models/document";
import { Template } from "@/types/models/templates";

import styles from "../styles.module.css";
import ChooseDocuments from "./documents";
import SectionFooter from "../section-footer";
import SectionHeader from "../section-header";
import ExistingTemplates from "./existing-templates";

interface Props {
  onNext: () => void;
  onPrevious: () => void;
  documents: DocumentModal[];
  templateId?: string;
  onChange: (name: string, isRequired: boolean, index?: number) => void;
  onChangeExistingTemplate: (template: Template) => void;
  onRemove: (name: string) => void;
}

enum TemplateMode {
  USE_TEMPLATE = "use_template",
  ADD_DOCUMENTS = "add_documents",
}

const ChooseTemplate = ({
  onNext,
  onPrevious,
  documents = [],
  templateId,
  onChange,
  onChangeExistingTemplate,
  onRemove,
}: Props) => {
  const [mode, setMode] = useState<TemplateMode>(TemplateMode.ADD_DOCUMENTS);

  return (
    <>
      <SectionHeader
        title="Choose Template"
        description="Select a template with a predefined checklist or manually add required documents."
      />

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
        <ExistingTemplates
          onChange={onChangeExistingTemplate}
          templateId={templateId}
        />
      )}

      {mode === TemplateMode.ADD_DOCUMENTS && (
        <ChooseDocuments
          documents={documents}
          onChange={onChange}
          onRemove={onRemove}
        />
      )}

      <SectionFooter onNext={onNext} onPrevious={onPrevious} />
    </>
  );
};

export default ChooseTemplate;
