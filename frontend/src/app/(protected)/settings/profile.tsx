"use client";
import { User2 } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { IconBadge } from "@/components/ui/icon-badge";
import { useUpdateUser } from "@/hooks/data/user/use-user";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/models/user";

import styles from "./settings.module.css";

const Profile = () => {
  const authUser = useAuthStore((store) => store.user);
  const updateUser = useUpdateUser();

  const [user, setUser] = useState<User>(authUser || ({} as User));
  const [isUserDetailsChanged, setIsUserDetailsChanged] = useState(false);

  const onChangeUser = useCallback((prop: string, value: string) => {
    setUser((prev) => ({
      ...prev,
      [prop]: value,
    }));

    setIsUserDetailsChanged(true);
  }, []);

  const onSaveUserDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const cleanedUser = {
      ...user,
      firstName: user.firstName.trim(),
      lastName: user.lastName.trim(),
      phoneNumber: user.phoneNumber?.trim(),
    };

    updateUser.mutate(cleanedUser);
    setIsUserDetailsChanged(false);
  };

  const isLoading = updateUser.isPending;

  return (
    <section className={`${styles.section} card`}>
      <div className={styles.sectionHeader}>
        <div>
          <IconBadge icon={User2} size="md" />
        </div>
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
            label="First Name"
            id="firstName"
            value={user?.firstName ?? ""}
            placeholder="Enter your first name"
            onChange={(e) => onChangeUser("firstName", e.target.value)}
            disabled={isLoading}
          />
          <Input
            required
            label="Last Name"
            id="lastName"
            value={user?.lastName ?? ""}
            placeholder="Enter your last name"
            onChange={(e) => onChangeUser("lastName", e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="d-flex gap-2">
          <Input
            required
            label="Email"
            id="email"
            value={user?.email ?? ""}
            placeholder="Enter your email"
            message="Email cannot be changed. Please contact support"
            messageType="secondary"
            disabled
          />
          <Input
            required
            label="Phone Number"
            id="phoneNumber"
            value={user?.phoneNumber ?? ""}
            placeholder="Enter your phone number"
            onChange={(e) => onChangeUser("phoneNumber", e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className={styles.saveBtn}>
          <Button
            title={
              isUserDetailsChanged
                ? "Save your changes"
                : "Make changes and save your changes"
            }
            disabled={isLoading}
            type="submit"
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </section>
  );
};

export default Profile;
