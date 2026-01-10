"use client";

import { useEffect, useState } from "react";
import { Check, Quote } from "lucide-react";

import styles from "./auth-info-panel.module.css";
import { IconBadge } from "../../icon-badge";
import { AUTH_INFO_CONTENT } from "./content";
import type { AuthInfoVariant } from "./content.types";

interface Props {
  type: AuthInfoVariant;
}

export const AuthInfoPanel = ({ type }: Props) => {
  const content = AUTH_INFO_CONTENT[type];
  const [activeReview, setActiveReview] = useState(0);

  useEffect(() => {
    if (content.type !== "signup") return;

    const interval = setInterval(() => {
      setActiveReview((prev) =>
        prev === content.reviews.length - 1 ? 0 : prev + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [content]);

  const getIconSize = (index: number) =>
    index === 0 ? "xxl" : index === 1 ? "xl" : "lg";

  return (
    <section className={styles.container}>
      <div className={styles.badges}>
        {content.badges.map((b, index) => (
          <IconBadge
            key={index}
            icon={b.icon}
            variant={b.variant}
            size={getIconSize(index)}
          />
        ))}
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </header>

      <ul className={styles.featureList}>
        {content.features.map((feature) => (
          <li key={feature} className={styles.featureItem}>
            <span className={styles.icon}>
              <Check size={14} strokeWidth={2.5} />
            </span>
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>

      {content.type === "login" && (
        <div className={styles.trustedCard}>
          <IconBadge icon={content.trust.icon} variant="light" />
          <div className={styles.trustedCardInfo}>
            <p>{content.trust.title}</p>
            <p>{content.trust.subtitle}</p>
          </div>
        </div>
      )}

      {content.type === "signup" && (
        <div className={styles.reviewCard}>
          <Quote className={styles.quoteIcon} />
          <p className={styles.reviewText}>
            “{content.reviews[activeReview].quote}”
          </p>
          <div className={styles.reviewer}>
            <span className={styles.reviewerName}>
              {content.reviews[activeReview].author}
            </span>
            <span className={styles.reviewerRole}>
              {content.reviews[activeReview].role}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
