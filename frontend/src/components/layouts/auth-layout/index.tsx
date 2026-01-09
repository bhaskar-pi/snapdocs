import styles from "./auth-layout.module.css";

interface Props {
  left: React.ReactNode;
  right: React.ReactNode;
}

export const AuthLayout = ({ left, right }: Props) => {
  return (
    <div className={styles.container}>
      <section className={styles.left}>{left}</section>
      <section className={styles.right}>{right}</section>
    </div>
  );
};
