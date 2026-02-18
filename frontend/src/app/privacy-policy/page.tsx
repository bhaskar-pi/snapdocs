import styles from "./privacy-policy.module.css";

export default function PrivacyPolicy() {
  return (
    <div className={`bg-page ${styles.wrapper}`}>
      <div className={`shadow-lg rounded-xl ${styles.container}`}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.brandBadge}>SnapDocs — Beta</div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className="text-muted">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </header>

        <section className={styles.section}>
          <h3>1. Introduction</h3>
          <p>
            SnapDocs is a document collection workflow system currently provided
            as a beta product. By using SnapDocs, you agree to this Privacy
            Policy.
          </p>
        </section>

        <section className={styles.section}>
          <h3>2. Information We Collect</h3>

          <h4>Account Information</h4>
          <p>
            Name, email address, phone number, and securely stored login
            credentials.
          </p>

          <h4>Client Information</h4>
          <p>
            Client name, email, phone number, and internal notes created by
            users.
          </p>

          <h4>Document Metadata</h4>
          <p>
            File name, file size, MIME type, and upload timestamps. Files are
            stored securely and accessed via signed URLs.
          </p>
        </section>

        <section className={styles.section}>
          <h3>3. Data Security</h3>
          <p>
            We implement authentication controls and secure file access.
            However, no system guarantees absolute security.
          </p>

          <div className={styles.betaNotice}>
            SnapDocs is in beta. Bugs, downtime, or data loss may occur.
            Maintain independent backups of important documents.
          </div>
        </section>

        <section className={styles.section}>
          <h3>4. Data Ownership</h3>
          <p>
            Users retain ownership of their uploaded documents. SnapDocs does
            not claim ownership of user content.
          </p>
        </section>

        <section className={styles.section}>
          <h3>5. Changes to Policy</h3>
          <p>
            This Privacy Policy may be updated without prior notice. Continued
            use indicates acceptance of changes.
          </p>
        </section>

        <footer className={styles.footer}>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} SnapDocs. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
