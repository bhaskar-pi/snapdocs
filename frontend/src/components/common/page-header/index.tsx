"use client";

import styles from "./page-header.module.css";
import { Button } from "../button";

interface Props {
  header: string;
  description: string;
  button?: {
    title: string;
    icon?: React.ReactNode;
    width?: string;
    variant?: "primary" | "secondary" | "neutral" | "negative";
  };
}

const PageHeader = ({ header, description, button }: Props) => {
  const handleOnClick = () => {
    console.log("Clicked");
  };
  return (
    <div className={styles.pageContainer}>
      <div>
        <h1 className={styles.pageHeader}>{header}</h1>
        <p className={styles.pageDescription}>{description}</p>
      </div>

      {button && (
        <Button
          className={styles.button}
          variant={button.variant}
          icon={button.icon}
          onClick={handleOnClick}
        >
          {button.title}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
