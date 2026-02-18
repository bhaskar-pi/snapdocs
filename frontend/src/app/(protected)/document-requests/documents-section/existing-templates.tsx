import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { EmptyState } from "@/components/ui/empty-state";
import { SearchInput } from "@/components/ui/form/search";
import { Icon } from "@/components/ui/icon";
import { ContentLoader } from "@/components/ui/loader/content-loader";
import { useTemplates } from "@/hooks/data/templates/use-templates";
import { useAuthStore } from "@/store/auth.store";
import { SCREEN_PATHS } from "@/types/enums/paths";
import { Template } from "@/types/models/templates";

import styles from "../styles.module.css";

interface Props {
  templateId?: string;
  onChange: (template: Template) => void;
}

const ExistingTemplates = ({ templateId, onChange }: Props) => {
  const router = useRouter();

  const userId = useAuthStore((s) => s.user?.id || "");
  const { data: templates, isLoading = true } = useTemplates(userId);

  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>(
    templates?.data || [],
  );

  const onSearchTemplates = (searchText: string) => {
    const baseList = templates?.data || [];

    const filtered = baseList.filter((t) =>
      t.title.toLowerCase().includes(searchText.toLowerCase()),
    );

    setFilteredTemplates(filtered);
  };

  return (
    <form className={styles.stepForm}>
      {isLoading && (
        <ContentLoader size="sm" text="Loading templates..." open />
      )}

      {!isLoading && (
        <SearchInput
          id="existing-template"
          placeholder="Search templates..."
          disabled={isLoading}
          onChange={(e) => onSearchTemplates(e.target.value)}
        />
      )}

      {!isLoading && filteredTemplates.length === 0 && (
        <EmptyState
          icon={<FileText size={40} />}
          title="No templates found"
          description="Create reusable document templates to speed up future requests."
          primaryActionLabel="Create Template"
          onPrimaryAction={() => router.push(SCREEN_PATHS.TEMPLATES)}
        />
      )}

      {!isLoading && filteredTemplates.length > 0 && (
        <div className={styles.templatesGrid}>
          {filteredTemplates.map((template) => {
            const MAX_DOCS_VISIBLE = 3;
            const visibleDocs = template.documents.slice(0, MAX_DOCS_VISIBLE);
            const remainingCount = template.documents.length - MAX_DOCS_VISIBLE;

            return (
              <div
                key={template.id}
                data-type={templateId === template.id ? "active" : ""}
                className={`card ${styles.existingTemplateCard}`}
                role="button"
                onClick={() => onChange(template)}
              >
                <div className={styles.cardTop}>
                  <div className="d-flex gap-2 items-start">
                    <Icon name={FileText} tone="primary" className="mt-2" />

                    <div className={styles.textBlock}>
                      <h6 className="truncate">{template.title}</h6>

                      <p className={styles.description}>
                        {template.description}
                      </p>
                    </div>
                  </div>

                  <p className="count-light">{template.documents.length}</p>
                </div>

                <p className={styles.documents}>
                  {visibleDocs.map((doc) => doc.name).join(", ")}
                  {remainingCount > 0 && ` +${remainingCount} more`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default ExistingTemplates;
