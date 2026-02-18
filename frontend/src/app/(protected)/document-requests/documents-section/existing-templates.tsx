import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useMemo, useEffect } from "react";

import { Button } from "@/components/ui/button";
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

  const [search, setSearch] = useState("");

  const filteredTemplates = useMemo(() => {
    const baseList = templates?.data || [];
    return baseList.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [templates?.data, search]);

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
          onChange={(e) => setSearch(e.target.value)}
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
            const MAX_DOCS_VISIBLE = 2;
            const visibleDocs = template.documents.slice(0, MAX_DOCS_VISIBLE);
            const remainingCount = template.documents.length - MAX_DOCS_VISIBLE;

            return (
              <div
                key={template.id}
                data-type={templateId === template.id ? "active" : ""}
                className={`card ${styles.existingTemplateCard}`}
              >
                <div className={styles.cardTop}>
                  <div className="d-flex gap-3 items-start">
                    <Icon
                      name={FileText}
                      size={20}
                      tone="primary"
                      className="mt-2"
                    />

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
                  <span>
                    {" "}
                    {remainingCount > 0 && ` +${remainingCount} more`}
                  </span>
                </p>

                <div className={styles.cardFooter}>
                  <Button
                    type="button"
                    className={styles.useBtn}
                    onClick={() => onChange(template)}
                    size="xs"
                    intent="primary"
                  >
                    Use Template
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default ExistingTemplates;
