"use client";

import { User2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { INDUSTRY_TYPE_OPTIONS } from "@/app/(auth)/signup/signup-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/select";
import { IconBadge } from "@/components/ui/icon-badge";
import { ContentLoader } from "@/components/ui/loader/content-loader";
import { useGetUser, useUpdateUser } from "@/hooks/data/user/use-user";
import { User } from "@/types/models/user";

import styles from "./settings.module.css";

const Profile = () => {
  const { data: response, isLoading: userLoading } = useGetUser();
  const authUser = response?.data;

  const updateUser = useUpdateUser();

  const [form, setForm] = useState<Partial<User>>({});

  const updatedUser = useMemo(() => {
    return {
      ...authUser,
      ...form,
    } as User;
  }, [authUser, form]);

  const onChangeUser = useCallback((prop: keyof User, value: string) => {
    setForm((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }, []);

  const onSaveUserDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authUser) return;

    const cleanedUser: User = {
      ...updatedUser,
      firstName: updatedUser.firstName?.trim(),
      lastName: updatedUser.lastName?.trim(),
      phoneNumber: updatedUser.phoneNumber?.trim(),
      businessName: updatedUser.businessName?.trim(),
      otherBusinessType: updatedUser.otherBusinessType?.trim(),
    };

    updateUser.mutate(cleanedUser, {
      onSuccess: () => {
        setForm({});
      },
    });
  };

  const isLoading = userLoading || updateUser.isPending || !authUser;

  if (isLoading) {
    return <ContentLoader open />;
  }

  return (
    <section className={`${styles.section} card`}>
      <div className={styles.sectionHeader}>
        <IconBadge icon={User2} size="md" />
        <div>
          <h1 className={styles.sectionTitle}>Profile Information</h1>
          <p className={styles.sectionDescription}>
            Update your personal details
          </p>
        </div>
      </div>

      <form className={styles.form} onSubmit={onSaveUserDetails}>
        <div className="d-flex gap-2">
          <Input
            required
            id="firstName"
            label="First Name"
            value={updatedUser?.firstName ?? ""}
            placeholder="Enter your first name"
            onChange={(e) => onChangeUser("firstName", e.target.value)}
            disabled={isLoading}
          />

          <Input
            required
            id="lastName"
            label="Last Name"
            value={updatedUser?.lastName ?? ""}
            placeholder="Enter your last name"
            onChange={(e) => onChangeUser("lastName", e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Email + Phone */}
        <div className="d-flex gap-2">
          <Input
            required
            type="email"
            id="email"
            label="Email"
            placeholder="name@company.com"
            value={updatedUser?.email ?? ""}
            onChange={(e) => onChangeUser("email", e.target.value)}
            disabled={isLoading}
          />

          <Input
            id="phoneNumber"
            label="Phone Number"
            value={updatedUser?.phoneNumber ?? ""}
            placeholder="Enter your phone number"
            onChange={(e) => onChangeUser("phoneNumber", e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Business */}
        <div className="d-flex gap-2">
          <Input
            required
            id="businessName"
            label="Business Name"
            placeholder="Acme Advisory LLP"
            value={updatedUser?.businessName ?? ""}
            onChange={(e) => onChangeUser("businessName", e.target.value)}
            disabled={isLoading}
          />

          <Select
            id="industry"
            label="Industry"
            placeholder="Select your business industry"
            value={updatedUser?.businessType ?? ""}
            onChange={(value) => onChangeUser("businessType", value)}
            options={INDUSTRY_TYPE_OPTIONS}
            disabled={isLoading}
          />
        </div>

        {/* Other Business Type */}
        {updatedUser?.businessType === "OTHER" && (
          <Input
            required
            id="otherBusinessType"
            label="Other Business Type"
            placeholder="Enter business type"
            value={updatedUser?.otherBusinessType ?? ""}
            onChange={(e) => onChangeUser("otherBusinessType", e.target.value)}
            disabled={isLoading}
          />
        )}

        <div className={styles.saveBtn}>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
