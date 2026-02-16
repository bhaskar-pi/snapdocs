"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { useLogin } from "@/hooks/data/auth/use-login";
import { SCREEN_PATHS } from "@/types/enums/paths";

import styles from "./auth.module.css";
import { Logo } from "../ui/logo";

const LoginForm = () => {
  const login = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate({ email, password });
  };

  return (
    <>
      <div className={styles.topRightLogo}>
        <Logo size="sm" showText={false} />
      </div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.header}>
            <h1>Welcome!</h1>
            <p>Log in to manage your documents </p>
          </div>

          <div className={styles.formInputs}>
            <Input
              required
              id="email"
              type="email"
              placeholder="Enter email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={login.isPending}
              fieldClassName="input-lg"
            />

            <Input
              required
              id="password"
              type="password"
              placeholder="Enter password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              message="forgot password?"
              messagePosition="right"
              messageType="info"
              disabled={login.isPending}
              fieldClassName="input-lg"
            />
          </div>

          <Button
            loading={login.isPending}
            type="submit"
            className={styles.button}
          >
            {login.isPending ? "Logging in..." : "Log In"}
          </Button>

          <div className={styles.switch}>
            <p>{`Don't have an account?`}</p>
            <Link href={SCREEN_PATHS.SIGNUP}>Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
