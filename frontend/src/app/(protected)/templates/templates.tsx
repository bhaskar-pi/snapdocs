"use client";

import { FileText } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import Layout from "@/components/layouts/app-layout";
import TemplateCard from "@/components/templates/template-card";
import { EmptyState } from "@/components/ui/empty-state";
import {
  useCreateTemplate,
  useDeleteTemplate,
  useTemplates,
  useUpdateTemplate,
} from "@/hooks/data/templates/use-templates";
import { useAuthStore } from "@/store/auth.store";
import { Template } from "@/types/models/templates";

import TemplateModal from "./template-modal";
import styles from "./templates.module.css";

enum Mode {
  CREATE = "create",
  EDIT = "edit",
}

const getTitle = (mode?: Mode) => {
  return mode === Mode.CREATE ? "Create Template" : "Edit Template";
};

const Templates = () => {
  const [template, setTemplate] = useState<Template>();
  const [mode, setMode] = useState<Mode | undefined>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [documentName, setDocumentName] = useState<string>("");

  const userId = useAuthStore((store) => store.user?.id || "");
  const { data: templates, isLoading: templatesLoading } = useTemplates(userId);

  const updateTemplate = useUpdateTemplate(userId);
  const deleteTemplate = useDeleteTemplate(userId);
  const createTemplate = useCreateTemplate(userId);

  const onCloseModal = useCallback(() => {
    setMode(undefined);
    setOpenModal(false);
  }, []);

  const onOpenModal = useCallback((template?: Template) => {
    setMode(template ? Mode.EDIT : Mode.CREATE);
    setTemplate(template);
    setOpenModal(true);
  }, []);

  const onChangeTemplateDetails = useCallback((prop: string, value: string) => {
    setTemplate((prev) => ({
      ...(prev || ({} as Template)),
      [prop]: value,
    }));
  }, []);

  const onAddDocument = useCallback(
    (name: string) => {
      const documents = template?.documents ?? [];

      const isDuplicate = documents.some(
        (doc) => doc.name.toLowerCase() === name.toLowerCase(),
      );

      if (isDuplicate) {
        toast.error(`${name} already exists.`);
        return;
      }

      setTemplate((prev) => ({
        ...(prev || ({} as Template)),
        documents: [...documents, { name, isRequired: true }],
      }));

      setDocumentName("");
    },
    [template?.documents],
  );

  const onToggleDocumentRequired = useCallback(
    (name: string, isRequired: boolean) => {
      setTemplate((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          documents: prev.documents.map((doc) =>
            doc.name === name ? { ...doc, isRequired } : doc,
          ),
        };
      });
    },
    [],
  );

  const onDeleteDocument = useCallback((name: string) => {
    setTemplate((prev) => ({
      ...((prev || {}) as Template),
      documents: prev?.documents?.filter((doc) => doc.name !== name) || [],
    }));
  }, []);

  const onSaveTemplate = () => {
    if (template && template.id) {
      updateTemplate.mutate(template);
    } else if (template) {
      createTemplate.mutate(template);
    }

    onCloseModal();
  };

  const onDeleteTemplate = (templateId: string) => {
    if (templateId) {
      deleteTemplate.mutate(templateId);
    }

    onCloseModal();
  };

  const isLoading =
    templatesLoading ||
    updateTemplate.isPending ||
    deleteTemplate.isPending ||
    createTemplate.isPending;

  return (
    <Layout
      header={{
        title: "Templates",
        description: "Create reusable document request templates",
        action: {
          label: "Create Template",
          onClick: () => onOpenModal(),
        },
      }}
      isLoading={isLoading}
    >
      {templates?.data?.length === 0 && !templatesLoading ? (
        <EmptyState
          icon={<FileText size={48} />}
          title="No templates yet"
          description="Create reusable document request templates to save time and standardize your workflow."
          primaryActionLabel="Create Template"
          onPrimaryAction={() => onOpenModal()}
          size="lg"
        />
      ) : (
        <div className={styles.cards}>
          {templates?.data?.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onEdit={() => onOpenModal(template)}
              onDelete={() => onDeleteTemplate(template.id)}
            />
          ))}
        </div>
      )}

      <TemplateModal
        isLoading={isLoading}
        title={getTitle(mode)}
        open={openModal}
        documentName={documentName}
        template={template}
        setDocumentName={setDocumentName}
        onClose={onCloseModal}
        onSave={onSaveTemplate}
        onDelete={template?.id ? onDeleteTemplate : undefined}
        onDismiss={onCloseModal}
        onAddDocument={onAddDocument}
        onDeleteDocument={onDeleteDocument}
        onToggleRequired={onToggleDocumentRequired}
        onChangeTemplate={onChangeTemplateDetails}
      />
    </Layout>
  );
};

export default Templates;
