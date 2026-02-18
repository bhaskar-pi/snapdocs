import { Select } from "@/components/ui/form/select";
import { useTemplates } from "@/hooks/data/templates/use-templates";
import { useAuthStore } from "@/store/auth.store";
import { Template } from "@/types/models/templates";

import styles from "../styles.module.css";

interface Props {
  templateId?: string;
  onChange: (template: Template) => void;
}

const ExistingTemplates = ({ templateId, onChange }: Props) => {
  const userId = useAuthStore((s) => s.user?.id || "");
  const { data: templates, isLoading } = useTemplates(userId);

  const templateOptions =
    templates?.data
      ?.filter((template) => template.documents?.length)
      ?.map((template) => ({
        label: `${template.title} (${template.documents?.length ?? 0} documents)`,
        value: template.id,
      })) ?? [];

  const onSelectTemplate = (id: string) => {
    const selectedTemplate = templates?.data?.find((c) => c.id === id);

    if (selectedTemplate) {
      onChange(selectedTemplate);
    }
  };

  return (
    <form className={styles.stepForm}>
      <Select
        id="existing-template"
        label="Template"
        placeholder={isLoading ? "Loading templates..." : "Select a template"}
        value={templateId ?? ""}
        options={templateOptions}
        isLoading={isLoading}
        disabled={isLoading}
        onChange={(templateId) => onSelectTemplate(templateId)}
      />
    </form>
  );
};

export default ExistingTemplates;
