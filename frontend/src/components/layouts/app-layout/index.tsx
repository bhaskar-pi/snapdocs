"use client";

import { Loader } from "@/components/ui/loader";
import { ContentLoader } from "@/components/ui/loader/content-loader";
import PageHeader from "@/components/ui/page-header";
import { PageHeaderAction } from "@/components/ui/page-header/page-header.types";
import { useAuthStore } from "@/store/auth.store";

import styles from "./app-layout.module.css";
import Sidebar from "./sidebar";

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
}

const Layout = ({ children, isLoading, header }: Props) => {
  const authLoading = useAuthStore((s) => s.isLoading);

  return (
    <div className={styles.layout}>
      <Loader open={authLoading} />
      <Sidebar />

      <main className={styles.main}>
        <PageHeader {...header} />

        <div className={styles.body}>
          {isLoading && !authLoading ? <ContentLoader open /> : children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
