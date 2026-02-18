"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "../button";
import styles from "./page-header.module.css";
import { PageHeaderAction } from "./page-header.types";
import { IconBadge } from "../icon-badge";

interface Props {
  title?: string;
  description?: string;

  back?: string;
  backTitle?: string;

  action?: PageHeaderAction;
}

const PageHeader = ({ title, description, back, backTitle, action }: Props) => {
  const router = useRouter();

  const handleBack = () => {
    if (back) router.push(back);
  };

  const handleAction = () => {
    if (action?.path) {
      router.push(action.path);
      return;
    }

    action?.onClick?.();
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {back && (
          <button
            type="button"
            className={styles.backContainer}
            onClick={handleBack}
          >
            <IconBadge icon={ArrowLeft} mode="soft" variant="secondary" />
          </button>
        )}

        {(title || backTitle) && (
          <div className={styles.titleBlock}>
            <h1 className={styles.header}>{title}</h1>
            {backTitle && <h3 className={styles.backTitle}>{backTitle}</h3>}

            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}
      </div>

      {action && (
        <div className={styles.right}>
          <Button
            intent={action.intent ?? "primary"}
            onClick={handleAction}
            icon={action.icon ?? <Plus size={16} />}
            size={action.size ?? "sm"}
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageHeader;
