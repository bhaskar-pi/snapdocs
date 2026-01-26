"use client";

import { Loader } from "@/components/common/loader";
import { useAuthStore } from "@/store/auth.store";

import styles from "./app-layout.module.css";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  const isLoading = useAuthStore((s) => s.isLoading);
  return (
    <div className={styles.layout}>
      <Loader open={isLoading} />
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
