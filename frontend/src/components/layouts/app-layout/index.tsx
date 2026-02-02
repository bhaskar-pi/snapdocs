"use client";

import { Loader } from "@/components/ui/loader";
import { ContentLoader } from "@/components/ui/loader/content-loader";
import { useAuthStore } from "@/store/auth.store";

import styles from "./app-layout.module.css";
import Sidebar from "./sidebar";


interface Props {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Layout = ({ children, isLoading }: Props) => {
  const authLoading = useAuthStore((s) => s.isLoading);
  return (
    <div className={styles.layout}>
      <Loader open={authLoading} />
      <Sidebar />
      <main className={styles.content}>
        {isLoading && !authLoading ? <ContentLoader open /> : children}
      </main>
    </div>
  );
};

export default Layout;
