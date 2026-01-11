"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { Button } from "@/components/button/Button";
import { Input } from "@/components/form/input";
import { Logo } from "@/components/logo";
import { useSignup } from "@/hooks/auth/use-signup";
import { SignUpForm as SignUpFormType } from "@/types/models/auth.model";

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
    []
  );

  const handleCreateAccount = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      signup.mutate(form);
    },
    [form, signup]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleCreateAccount}>
        <Logo size="lg" />
        <div className={styles.header}>
          <h1>Create your SnapDocs account</h1>
          <p>Start collecting documents the smart way</p>
        </div>

        <div className="base-two-in-row">
          <Input
            required
            id="firstName"
            label="First Name"
            type="text"
            placeholder="John"
            value={form.firstName}
            onChange={(e) => onChangeForm("firstName", e.target.value)}
          />
          <Input
            required
            id="lastName"
            label="Last Name"
            type="text"
            placeholder="Smith"
            value={form.lastName}
            onChange={(e) => onChangeForm("lastName", e.target.value)}
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
        />

        <Input
          required
          id="password"
          label="Password"
          type="password"
          placeholder="Create a secure password"
          value={form.password}
          onChange={(e) => onChangeForm("password", e.target.value)}
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
