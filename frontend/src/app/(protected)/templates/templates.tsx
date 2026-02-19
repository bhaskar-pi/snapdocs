"use client";

import { Edit, Ellipsis, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import { DataTable } from "@/components/data-table";
import Layout from "@/components/layouts/app-layout";
import { ActionMenu } from "@/components/ui/action-menu";
import { SearchInput } from "@/components/ui/form/search";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
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
  const [templateToDelete, setTemplateToDelete] = useState<
    Template | undefined
  >();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [search, setSearch] = useState("");

  const userId = useAuthStore((store) => store.user?.id || "");
  const { data: templates, isLoading: templatesLoading } = useTemplates(userId);

  const updateTemplate = useUpdateTemplate(userId);
  const deleteTemplate = useDeleteTemplate(userId);
  const createTemplate = useCreateTemplate(userId);

  const filteredTemplates = useMemo(() => {
    if (!templates || !templates?.data) return [];

    return templates.data.filter((template) =>
      template.title.toLowerCase().includes(search.toLowerCase().trim()),
    );
  }, [templates, search]);

  const onCloseModal = useCallback(() => {
    setMode(undefined);
    setOpenModal(false);
    setShowDeleteModal(false);
    setTemplateToDelete(undefined);
  }, []);

  const onOpenEditModal = useCallback((template?: Template) => {
    setMode(template ? Mode.EDIT : Mode.CREATE);
    setTemplate(template);
    setOpenModal(true);
    // when open edit modal - have a delete btn - so when clicked on delete we need data for onConfirmDeleteTemplate()
    setTemplateToDelete(template);
  }, []);

  const onOpenDeleteModal = useCallback((template?: Template) => {
    setTemplateToDelete(template);
    setShowDeleteModal(true);
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

  const onConfirmDeleteTemplate = () => {
    if (!templateToDelete?.id) return;

    deleteTemplate.mutate(templateToDelete.id, {
      onSuccess: () => {
        onCloseModal();
      },
    });
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
          onClick: () => onOpenEditModal(),
        },
      }}
      isLoading={isLoading}
    >
      <form style={{ width: "400px" }} className="d-flex justify-end mb-6">
        <SearchInput
          id="search"
          value={search}
          placeholder="Search templates..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <DataTable
        title="Templates"
        onEmptyAction={() => onOpenEditModal()}
        columnWidths="1fr 160px 180px 160px 68px"
        emptyText="No templates found"
        emptyDescription="Create reusable document request templates to standardize your workflow."
        isLoading={templatesLoading}
        count={filteredTemplates?.length || 0}
        columns={
          <>
            <p>Template</p>
            <p>Documents</p>
            <p>Category</p>
            <p>Last Updated</p>
            <p />
          </>
        }
        rows={filteredTemplates?.map((template) => {
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
                      name={Edit}
                      onClick={() => onOpenEditModal(template)}
                    />
                    <Icon
                      tone="negative"
                      text="Delete"
                      name={Trash2}
                      onClick={() => onOpenDeleteModal(template)}
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
        onDelete={template?.id ? onConfirmDeleteTemplate : undefined}
        onDismiss={onCloseModal}
        onAddDocument={onAddDocument}
        onDeleteDocument={onDeleteDocument}
        onToggleRequired={onToggleDocumentRequired}
        onChangeTemplate={onChangeTemplateDetails}
      />

      <Modal
        size="small"
        type="negative"
        open={showDeleteModal}
        title="Delete Template"
        onClose={onCloseModal}
        onDelete={{
          label: "Delete",
          onClick: onConfirmDeleteTemplate,
          isLoading: deleteTemplate.isPending,
          disabled: deleteTemplate.isPending,
        }}
        onDismiss={{
          label: "Cancel",
          onClick: onCloseModal,
          disabled: deleteTemplate.isPending,
        }}
      >
        <p>
          You are about to permanently delete{" "}
          <strong>{templateToDelete?.title}</strong>
        </p>

        <p className="mt-2">
          All associated document definitions will be removed. This action
          cannot be undone.
        </p>

        <p className="mt-2">
          <strong>Are you sure you want to continue?</strong>
        </p>
      </Modal>
    </Layout>
  );
};

export default Templates;
