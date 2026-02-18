"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { Logo } from "@/components/ui/logo";
import { useLogin } from "@/hooks/data/auth/use-login";
import { SCREEN_PATHS } from "@/types/enums/paths";

import styles from "./login.module.css";

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
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-col mb-4">
            <h3>Welcome!</h3>
            <p className="subtitle-sm">Log in to manage your documents</p>
          </div>

          <div className="d-flex flex-col gap-3">
            <Input
              required
              id="email"
              type="email"
              placeholder="Enter email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={login.isPending}
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
              messageType="secondary"
              disabled={login.isPending}
            />
          </div>

          <Button loading={login.isPending} type="submit" className="mt-2">
            {login.isPending ? "Logging in..." : "Log In"}
          </Button>

          <div className="d-flex items-center justify-center gap-2 mt-2">
            <p>Don&apos;t have an account?</p>
            <Link href={SCREEN_PATHS.SIGNUP}>Sign up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
