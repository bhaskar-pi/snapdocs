"use client";

import { Ellipsis, Pencil, Trash2 } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import Layout from "@/components/layouts/app-layout";
import { ActionMenu } from "@/components/ui/action-menu";
import { Icon } from "@/components/ui/icon";
import {
  useCreateTemplate,
  useDeleteTemplate,
  useTemplates,
  useUpdateTemplate,
} from "@/hooks/data/templates/use-templates";
import { useAuthStore } from "@/store/auth.store";
import { Template } from "@/types/models/templates";

import TemplateModal from "./template-modal";

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
      <DataTable
        title="Templates"
        onEmptyAction={() => onOpenModal()}
        columnWidths="1fr 160px 180px 160px 68px"
        emptyText="No templates found"
        emptyDescription="Create reusable document request templates to standardize your workflow."
        isLoading={templatesLoading}
        count={templates?.data?.length || 0}
        columns={
          <>
            <p>Template</p>
            <p>Documents</p>
            <p>Category</p>
            <p>Last Updated</p>
            <p />
          </>
        }
        rows={templates?.data?.map((template) => {
          const requiredCount = template.documents.filter(
            (d) => d.isRequired,
          ).length;

          return (
            <div
              key={template.id}
              className="data-table-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 160px 180px 160px 68px",
              }}
            >
              <div>
                <p className="data-table-primary">{template.title}</p>
                <p className="data-table-secondary truncate">
                  {template.description}
                </p>
              </div>

              <p className="data-table-primary-row">
                {template.documents.length} docs • {requiredCount} required
              </p>

              <p className="data-table-primary-row">
                {template.category ?? "NA"} requests
              </p>

              <p className="data-table-primary-row">
                {new Date(template.updatedAt).toLocaleDateString()}
              </p>

              <ActionMenu
                trigger={<Icon name={Ellipsis} tone="muted" size={16} />}
                context={
                  <>
                    <Icon
                      text="Edit"
                      name={Pencil}
                      onClick={() => onOpenModal(template)}
                    />
                    <Icon
                      tone="negative"
                      text="Delete"
                      name={Trash2}
                      onClick={() => onDeleteTemplate(template.id)}
                    />
                  </>
                }
              />
            </div>
          );
        })}
      />

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
