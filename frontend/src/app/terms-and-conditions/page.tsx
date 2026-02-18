import styles from "./terms-conditions.module.css";

export default function TermsAndConditions() {
  return (
    <div className={`bg-page ${styles.wrapper}`}>
      <div className={`shadow-lg rounded-xl ${styles.container}`}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.brandBadge}>SnapDocs — Beta</div>
          <h1 className={styles.title}>Terms & Conditions</h1>
          <p className="text-muted">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </header>

        {/* Acceptance */}
        <section className={styles.section}>
          <h3>1. Acceptance of Terms</h3>
          <p>
            By accessing or using SnapDocs, you agree to be bound by these Terms
            and Conditions. If you do not agree, you must discontinue use.
          </p>
        </section>

        {/* Beta Notice */}
        <section className={styles.section}>
          <h3>2. Beta Software Notice</h3>
          <p>
            SnapDocs is currently provided as a beta product. Features may
            change, break, or be removed at any time.
          </p>

          <div className={styles.betaNotice}>
            This software is provided “as is.” Data loss, downtime, or
            unexpected behavior may occur. You use SnapDocs entirely at your own
            risk.
          </div>
        </section>

        {/* No Warranty */}
        <section className={styles.section}>
          <h3>3. No Warranty</h3>
          <p>
            SnapDocs is provided without warranties of any kind, whether express
            or implied, including but not limited to:
          </p>
          <ul className={styles.list}>
            <li>• Reliability or uninterrupted service</li>
            <li>• Accuracy of information</li>
            <li>• Fitness for a particular purpose</li>
            <li>• Security or compliance guarantees</li>
          </ul>
        </section>

        {/* Limitation of Liability */}
        <section className={styles.section}>
          <h3>4. Limitation of Liability</h3>
          <p>
            To the maximum extent permitted by law, SnapDocs and its creators
            shall not be liable for:
          </p>
          <ul className={styles.list}>
            <li>• Data loss</li>
            <li>• Financial or business losses</li>
            <li>• Client disputes</li>
            <li>• Compliance failures</li>
            <li>• Indirect or consequential damages</li>
          </ul>

          <div className={styles.criticalNotice}>
            You are responsible for maintaining independent backups and
            verifying document completeness before relying on the system.
          </div>
        </section>

        {/* User Responsibility */}
        <section className={styles.section}>
          <h3>5. User Responsibilities</h3>
          <p>You agree that you are responsible for:</p>
          <ul className={styles.list}>
            <li>• The documents you upload or collect</li>
            <li>• Compliance with applicable data protection laws</li>
            <li>• Maintaining secure access to your account</li>
            <li>• Maintaining your own data backups</li>
          </ul>
        </section>

        {/* Termination */}
        <section className={styles.section}>
          <h3>6. Termination</h3>
          <p>
            We may suspend or terminate access to SnapDocs at any time, without
            prior notice or liability.
          </p>
        </section>

        {/* Changes */}
        <section className={styles.section}>
          <h3>7. Changes to Terms</h3>
          <p>
            These Terms may be modified at any time. Continued use of SnapDocs
            constitutes acceptance of updated terms.
          </p>
        </section>

        {/* Governing Law */}
        <section className={styles.section}>
          <h3>8. Governing Law</h3>
          <p>
            These Terms shall be governed by the laws of your applicable
            jurisdiction.
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
