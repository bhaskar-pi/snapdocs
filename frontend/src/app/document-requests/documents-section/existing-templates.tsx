import { Select } from "@/components/ui/form/select";
import { useTemplates } from "@/hooks/data/templates/use-templates";
import { useAuthStore } from "@/store/auth.store";
import { DocumentModal } from "@/types/models/document";

import styles from "../styles.module.css";

interface Props {
  value?: string;
  onChange: (documents: DocumentModal[]) => void;
}

const ExistingTemplates = ({ value, onChange }: Props) => {
  const userId = useAuthStore((s) => s.user?.id || "");
  const { data: templates, isLoading } = useTemplates(userId);

  const templateOptions =
    templates?.map((template) => ({
      label: `${template.title} (${template.documents?.length ?? 0} documents)`,
      value: template.id,
    })) ?? [];

  const onSelectTemplate = (id: string) => {
    const selectedTemplate = templates?.find((c) => c.id === id);

    if (selectedTemplate?.documents) {
      onChange(selectedTemplate.documents);
    }
  };

  return (
    <form className={styles.stepForm}>
      <Select
        id="existing-template"
        label="Template"
        placeholder={isLoading ? "Loading templates..." : "Select a template"}
        value={value ?? ""}
        options={templateOptions}
        isLoading={isLoading}
        disabled={isLoading}
        onChange={(templateId) => onSelectTemplate(templateId)}
      />
    </form>
  );
};

export default ExistingTemplates;
