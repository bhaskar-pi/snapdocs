import { Logo } from "@/components/logo/logo";
import styles from "./auth.module.css";
import { Input } from "@/components/form/input";
import { Button } from "@/components/button/Button";

const LoginForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Logo size="lg" />
        <div className={styles.header}>
          <h1>Welcome back</h1>
          <p>Log in to manage your document requests</p>
        </div>

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="name@company.com"
        />

        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          message="forgot password?"
          messagePosition="right"
          messageType="info"
        />

        <Button type="submit" variant="primary" className={styles.button}>
          Log In
        </Button>

        <div className={styles.switch}>
          <p>{`Don't have an account?`}</p>
          <span>Sign up</span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
