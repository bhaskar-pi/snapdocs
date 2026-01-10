import Link from "next/link";
import { Logo } from "@/components/logo";
import styles from "./auth.module.css";
import { Input } from "@/components/form/input";
import { Button } from "@/components/button/Button";

const SignUpForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <Logo size="lg" />
        <div className={styles.header}>
          <h1>Create your SnapDocs account</h1>
          <p>Start collecting documents the smart way</p>
        </div>

        <div className="base-two-in-row">
          <Input
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
          />
          <Input
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Smith"
          />
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
          placeholder="Create a secure password"
        />

        <Button type="submit" variant="primary" className={styles.button}>
          Create Account
        </Button>

        <div className={styles.switch}>
          <p>{`Already have an account?`}</p>
          <Link href="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
