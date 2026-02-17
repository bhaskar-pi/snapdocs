import { Check } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Logo } from "@/components/ui/logo";

import { AUTH_INFO_CONTENT } from "./content";
import { LoginAuthInfo } from "./content.types";
import styles from "./side-panel.module.css";

const LoginPanel = () => {
  const content = AUTH_INFO_CONTENT.login as LoginAuthInfo;

  return (
    <section className={styles.container}>
      <Logo size="xxl" />

      <header className={styles.header}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
      </header>

      {content.features?.length > 0 && (
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
      )}

      <div className={styles.trustedCard}>
        <IconBadge icon={content.trust.icon} />
        <div className={styles.trustedCardInfo}>
          <p>{content.trust.title}</p>
          <p>{content.trust.subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default LoginPanel;
