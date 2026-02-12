"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { Logo } from "@/components/ui/logo";
import { useSignup } from "@/hooks/data/auth/use-signup";
import { SCREEN_PATHS } from "@/types/enums/paths";
import { SignUpForm as SignUpFormType } from "@/types/models/auth";

import styles from "./auth.module.css";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignUpForm = () => {
  const signup = useSignup();

  const [form, setForm] = useState<SignUpFormType>(initialForm);

  const onChangeForm = useCallback(
    (prop: keyof SignUpFormType, value: string) => {
      setForm((prev) => ({
        ...prev,
        [prop]: value,
      }));
    },
    [],
  );

  const handleCreateAccount = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      signup.mutate(form);
    },
    [form, signup],
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreateAccount}>
        <Logo size="lg" />
        <div className={styles.header}>
          <h1>Create your SnapDocs account</h1>
          <p>Start collecting documents the smart way</p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Input
            required
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            value={form.firstName}
            onChange={(e) => onChangeForm("firstName", e.target.value)}
            disabled={signup.isPending}
          />
          <Input
            required
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Smith"
            value={form.lastName}
            onChange={(e) => onChangeForm("lastName", e.target.value)}
            disabled={signup.isPending}
          />
        </div>

        <Input
          required
          id="email"
          label="Email"
          type="email"
          placeholder="name@company.com"
          value={form.email}
          onChange={(e) => onChangeForm("email", e.target.value)}
          disabled={signup.isPending}
        />

        <Input
          required
          id="password"
          label="Password"
          type="password"
          placeholder="Create a secure password"
          value={form.password}
          onChange={(e) => onChangeForm("password", e.target.value)}
          disabled={signup.isPending}
        />

        <Button
          disabled={signup.isPending}
          type="submit"
          className={styles.button}
        >
          {signup.isPending ? "Creating..." : "Create Account"}
        </Button>

        <div className={styles.switch}>
          <p>{`Already have an account?`}</p>
          <Link href={SCREEN_PATHS.LOGIN}>Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
