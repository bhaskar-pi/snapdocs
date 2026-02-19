"use client";

import Layout from "@/components/layouts/app-layout";
import { useDashboardStats } from "@/hooks/data/dashboard/use-dashboard";
import { SCREEN_PATHS } from "@/types/enums/paths";

import styles from "./dashboard.module.css";
import { MetricCard } from "./metric-card";
import { QuickActionsCard } from "./quick-actions";
import { RecentRequestsTable } from "./recent-request-table";
import { getMetricCards, mapRecentRequests } from "./stats";

const Dashboard = () => {
  const { data, isLoading } = useDashboardStats();
  const stats = data?.data;

  const metrics = getMetricCards(stats?.metrics);
  const recentRequests = mapRecentRequests(stats?.recentRequests);

  return (
    <Layout
      header={{
        title: "Dashboard",
        description:
          "See how your document requests and clients are tracking today.",
        action: {
          label: "Create Request",
          path: SCREEN_PATHS.DOCUMENT_REQUESTS,
        },
      }}
      isLoading={isLoading}
    >
      <section className={styles.page}>
        {/* Metrics */}
        <div className={styles.overviewGrid}>
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className={styles.detailGrid}>
          {/* Recent Requests */}
          <section className={`card ${styles.sectionCard}`}>
            <header className={styles.sectionHeader}>
              <p className={styles.sectionTitle}>Recent document requests</p>
              <p className={styles.sectionSubtitle}>
                Track the latest requests sent to your clients.
              </p>
            </header>

            <div style={{ marginBottom: 0 }}>
              <RecentRequestsTable requests={recentRequests} />
            </div>
          </section>

          {/* Attention Clients */}
          <QuickActionsCard />
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
