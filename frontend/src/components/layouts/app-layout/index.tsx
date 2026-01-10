import styles from "./app-layout.module.css";
import Sidebar from "./sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
