import Link from "next/link";

import { MarketingHeader } from "@/components/ui/marketing-header";

import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      <MarketingHeader />
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Stop chasing clients
            <br />
            for documents.
          </h1>

          <p className={styles.heroSubtitle}>
            Send a checklist. Get uploads. Track everything calmly.
          </p>

          <div className={styles.heroActions}>
            <Link href="/signup" className={styles.primaryBtn}>
              Get Started Free
            </Link>

            <a href="#how-it-works" className={styles.secondaryBtn}>
              See How It Works
            </a>
          </div>

          <div className={styles.trustRow}>
            <span>✔ Free during early access</span>
            <span>✔ No credit card required</span>
          </div>
        </div>

        {/* App Mock */}
        <div className={styles.appPreviewWrapper}>
          <div className={styles.browserMock}>
            <div className={styles.browserTop}>
              <div className={styles.dots}>
                <span />
                <span />
                <span />
              </div>
              <div className={styles.browserUrl}>app.snapdocs.in</div>
            </div>

            <div className={styles.browserContent}>
              <aside className={styles.sidebar}>
                <div className={styles.logoMini}>SnapDocs</div>
                <div className={styles.sidebarItemActive}>Dashboard</div>
                <div className={styles.sidebarItem}>Clients</div>
                <div className={styles.sidebarItem}>Templates</div>
                <div className={styles.sidebarItem}>Settings</div>
              </aside>

              <div className={styles.dashboardContent}>
                <div className={styles.metrics}>
                  <div className={styles.metricCard}>
                    <p>Pending</p>
                    <h3>12</h3>
                  </div>
                  <div className={styles.metricCard}>
                    <p>Received</p>
                    <h3 className="text-success">48</h3>
                  </div>
                  <div className={styles.metricCard}>
                    <p>Overdue</p>
                    <h3 className="text-danger">3</h3>
                  </div>
                </div>

                <div className={styles.tableCard}>
                  <h4>Recent Requests</h4>

                  <div className={styles.tableRow}>
                    <span>Sharma & Associates</span>
                    <span className={styles.statusPending}>Pending</span>
                  </div>

                  <div className={styles.tableRow}>
                    <span>Patel Industries</span>
                    <span className={styles.statusSuccess}>Completed</span>
                  </div>

                  <div className={styles.tableRow}>
                    <span>Kumar Enterprises</span>
                    <span className={styles.statusInfo}>In Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>How SnapDocs Works</h2>
          <p className={styles.sectionSubtitle}>
            Three simple steps to never chase documents again.
          </p>

          <div className={styles.cardGrid}>
            <div className={styles.infoCard}>
              <div className={styles.stepNumber}>01</div>
              <h4>Create a document request</h4>
              <p>
                Select a template or create a custom checklist. Add your client
                and set a due date.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.stepNumber}>02</div>
              <h4>Client uploads documents</h4>
              <p>
                Your client receives a simple link. They upload from any device
                - no login required.
              </p>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.stepNumber}>03</div>
              <h4>Track status & send reminders</h4>
              <p>
                {
                  "See what's pending, what's received, and send reminders when needed"
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BUILT FOR */}
      <section className={`${styles.section} ${styles.altSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Built for Professionals</h2>
          <p className={styles.sectionSubtitle}>
            SnapDocs helps anyone who collects documents from clients.
          </p>

          <div className={styles.professionGrid}>
            <div className={styles.professionCard}>Chartered Accountants</div>
            <div className={styles.professionCard}>GST Consultants</div>
            <div className={styles.professionCard}>Lawyers</div>
            <div className={styles.professionCard}>Auditors</div>
            <div className={styles.professionCard}>Consultants</div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Simple Pricing</h2>
          <p className={styles.sectionSubtitle}>
            Free during early access. No credit card required.
          </p>

          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <div>
                <h4>Early Access</h4>
                <p>Everything you need to get started</p>
              </div>
              <div className={styles.price}>₹0 / month</div>
            </div>

            <ul className={styles.featureList}>
              <li>Unlimited document requests</li>
              <li>Up to 50 clients</li>
              <li>Email notifications</li>
              <li>Basic support</li>
            </ul>

            <Link href="/signup" className={styles.primaryBtnFull}>
              Get Started Free
            </Link>

            <small className={styles.pricingNote}>
              Limits may apply during early access.
            </small>
          </div>
        </div>
      </section>
    </main>
  );
}
