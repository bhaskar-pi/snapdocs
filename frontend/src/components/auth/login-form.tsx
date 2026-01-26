"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { Input } from "@/components/ui/form/input";
import { useLogin } from "@/hooks/auth/use-login";

import styles from "./auth.module.css";

const LoginForm = () => {
  const login = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login.mutate({ email, password });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Logo size="lg" />
        <div className={styles.header}>
          <h1>Welcome back</h1>
          <p>Log in to manage your document requests</p>
        </div>

        <Input
          required
          id="email"
          label="Email"
          type="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          required
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          message="forgot password?"
          messagePosition="right"
          messageType="info"
        />

        <Button type="submit" variant="primary" className={styles.button}>
          {login.isPending ? "Logging in..." : "Log In"}
        </Button>

        <div className={styles.switch}>
          <p>{`Don't have an account?`}</p>
          <Link href="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
