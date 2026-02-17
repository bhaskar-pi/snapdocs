"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { SCREEN_PATHS } from "@/types/enums/paths";

import { Button } from "../button";
import { Icon } from "../icon";
import styles from "./page-header.module.css";

interface Props {
  header?: string;
  description?: string;
  backText?: string;
  backLink?: string;
  button?: {
    onClick?: () => void;
    title: string;
    icon?: React.ReactNode;
    path?: SCREEN_PATHS;
    intent?: "primary" | "secondary" | "success" | "warning" | "negative";
  };
}

const PageHeader = ({
  header,
  description,
  button,
  backText,
  backLink,
}: Props) => {
  const router = useRouter();

  const handleBack = () => {
    if (backLink) router.push(backLink);
  };

  const handleButtonClick = () => {
    if (button?.path) return router.push(button.path);
    button?.onClick?.();
  };

  return (
    <div className={styles.container}>
      {backText && (
        <button
          type="button"
          className={styles.backContainer}
          onClick={handleBack}
        >
          <Icon name={ArrowLeft} size={18} />
          <span>{backText}</span>
        </button>
      )}

      <div className={styles.headerContainer}>
        {header && (
          <div className={styles.titleBlock}>
            <h1 className={styles.header}>{header}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}

        {button && (
          <Button
            intent={button.intent ?? "primary"}
            onClick={handleButtonClick}
            icon={button.icon}
          >
            {button.title}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
