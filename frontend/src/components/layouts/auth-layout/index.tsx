import styles from "./auth-layout.module.css";

interface Props {
  type: "login" | "signup";
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export const AuthLayout = ({ left, right, type }: Props) => {
  return (
    <div className={styles.container}>
      <section data-type={type} className={styles.left}>
        {left}
      </section>
      <section data-type={type} className={styles.right}>
        {right}
      </section>
    </div>
  );
};
