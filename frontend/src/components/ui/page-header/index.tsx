"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { SCREEN_PATHS } from "@/types/enums/paths";

import styles from "./page-header.module.css";
import { Button } from "../button";
import { Icon } from "../icon";

interface Props {
  header?: string;
  description?: string;
  backText?: string;
  backLink?: string;
  button?: {
    title: string;
    icon?: React.ReactNode;
    path?: SCREEN_PATHS;
    width?: string;
    variant?: "primary" | "secondary" | "neutral" | "negative";
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

  return (
    <div className={styles.container}>
      {backText && (
        <div
          className={styles.backContainer}
          onClick={() => backLink && router.push(backLink)}
        >
          <Icon name={ArrowLeft} />
          <p>{backText}</p>
        </div>
      )}
      <div className={styles.headerContainer}>
        {header && (
          <div>
            <h1 className={styles.header}>{header}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}

        {button && (
          <Button
            intent={button.variant}
            icon={button.icon}
            onClick={() => button.path && router.push(button.path)}
          >
            {button.title}
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
