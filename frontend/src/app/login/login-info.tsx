import { Check, Clock3, FileText, FolderOpen, Shield } from "lucide-react";
import styles from "./login.module.css";
import { IconBadge } from "@/components/icon-badge";

const FEATURES = [
  "Secure document uploads with end-to-end encryption",
  "Track pending and overdue requests in real time",
  "Centralized document management dashboard",
];

export const LoginInfo = () => {
  return (
    <section className={styles.infoContainer}>
      <header className={styles.badges}>
        <IconBadge size="xxl" icon={FileText} />
        <IconBadge size="xl" icon={Shield} variant="warning" />
        <IconBadge size="lg" icon={Clock3} variant="success" />
      </header>
      <header className={styles.header}>
        <h1 className={styles.title}>Collect client documents effortlessly</h1>
        <p className={styles.subtitle}>
          Streamline your document collection workflow with a secure,
          professional platform built for modern practices.
        </p>
      </header>

      <ul className={styles.featureList}>
        {FEATURES.map((feature, index) => (
          <li key={index} className={styles.featureItem}>
            <span className={styles.icon}>
              <Check size={16} strokeWidth={2.5} />
            </span>
            <span className={styles.featureText}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className={styles.trustedCard}>
        <IconBadge icon={FolderOpen} variant="light" />
        <div className={styles.trustedCardInfo}>
          <p>Trusted by professionals</p>
          <p>3,500+ documents collected monthly</p>
        </div>
      </div>
    </section>
  );
};
