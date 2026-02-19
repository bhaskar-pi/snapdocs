"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/select";
import { Logo } from "@/components/ui/logo";
import { useSignup } from "@/hooks/data/auth/use-signup";
import {
  INDUSTRY_TYPE_LABELS,
  IndustryType,
  IndustryTypeKey,
} from "@/types/enums/industry";
import { SCREEN_PATHS } from "@/types/enums/paths";
import { SignUpForm as SignUpFormType } from "@/types/models/auth";

import styles from "./signup.module.css";

const initialForm: SignUpFormType = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  businessName: "",
  businessType: "" as IndustryTypeKey,
};

export const INDUSTRY_TYPE_OPTIONS = Object.values(IndustryType).map(
  (value) => ({
    value,
    label: INDUSTRY_TYPE_LABELS[value],
  }),
);

const SignUpForm = () => {
  const signup = useSignup();
  const [form, setForm] = useState<SignUpFormType>(initialForm);

  const onChangeForm = useCallback(
    (prop: keyof SignUpFormType, value: string | IndustryType) => {
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
      <div className={styles.topBar}>
        <Logo />
        <div className={styles.support}>
          For support:{" "}
          <a href="mailto:b.pasupurathi@gmail.com">b.pasupurathi@gmail.com</a>
        </div>
      </div>
      <div className={styles.content}>
        <form className={styles.form} onSubmit={handleCreateAccount}>
          <div className="mb-2">
            <h3>Create Account</h3>
            <p className="subtitle-sm">
              Fill in the form below to create your Snapdocs account
            </p>
          </div>

          <div className="d-flex gap-3">
            <Input
              required
              id="firstName"
              label="First Name"
              placeholder="John"
              value={form.firstName}
              onChange={(e) => onChangeForm("firstName", e.target.value)}
              disabled={signup.isPending}
            />

            <Input
              required
              id="lastName"
              label="Last Name"
              placeholder="Smith"
              value={form.lastName}
              onChange={(e) => onChangeForm("lastName", e.target.value)}
              disabled={signup.isPending}
            />
          </div>

          <div className="d-flex gap-3">
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
          </div>

          <div className="d-flex gap-3 mb-4">
            <Input
              required
              id="businessName"
              label="Business Name"
              placeholder="Acme Advisory LLP"
              value={form.businessName}
              onChange={(e) => onChangeForm("businessName", e.target.value)}
              disabled={signup.isPending}
            />

            <Select
              id="industry"
              label="Industry"
              placeholder="Select your business industry"
              value={form.businessType}
              onChange={(value) =>
                onChangeForm("businessType", value as IndustryType)
              }
              options={INDUSTRY_TYPE_OPTIONS}
              disabled={signup.isPending}
            />
          </div>

          <Button disabled={signup.isPending} type="submit" size="md">
            {signup.isPending ? "Creating..." : "Create Account"}
          </Button>

          <div className="d-flex items-center justify-center gap-2 mt-1">
            <p>Already have an account?</p>
            <Link href={SCREEN_PATHS.LOGIN}>Log In</Link>
          </div>
        </form>
      </div>
      <div className={styles.footer}>© SnapDocs 2026</div>
    </div>
  );
};

export default SignUpForm;
