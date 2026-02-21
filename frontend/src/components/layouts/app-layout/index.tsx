"use client";

import { Loader } from "@/components/ui/loader";
import { ContentLoader } from "@/components/ui/loader/content-loader";
import PageHeader from "@/components/ui/page-header";
import { PageHeaderAction } from "@/components/ui/page-header/page-header.types";
import { useAuthStore } from "@/store/auth.store";

import styles from "./app-layout.module.css";
import Sidebar from "./sidebar";

type LayoutSize = "default" | "sm" | "md" | "lg" | "xl";

interface Props {
  header?: {
    title?: string;
    description?: string;

    back?: string;
    backTitle?: string;

    action?: PageHeaderAction;
  };

  isLoading?: boolean;
  children: React.ReactNode;
  size?: LayoutSize;
}

const Layout = ({ children, isLoading, header, size = "default" }: Props) => {
  const authLoading = useAuthStore((s) => s.isLoading);
  const user = useAuthStore((s) => s.user);

  if (authLoading || !user) {
    return (
      <div className={styles.layout}>
        <Loader open />
      </div>
    );
  }
  return (
    <div className={styles.layout}>
      <Sidebar />

      <main className={styles.main}>
        <PageHeader {...header} />

        <div className={styles.body}>
          <div
            className={`${styles.container} ${
              size !== "default" ? styles[`container-${size}`] : ""
            }`}
          >
            {isLoading && !authLoading ? <ContentLoader open /> : children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
