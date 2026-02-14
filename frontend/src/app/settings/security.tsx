import { LockKeyhole } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { IconBadge } from "@/components/ui/icon-badge";
import { useUpdateUserPassword } from "@/hooks/data/auth/use-passwords";
import { UpdatePassword } from "@/types/models/auth";

import styles from "./settings.module.css";

const initialPasswords = {
  currentPassword: "",
  confirmNewPassword: "",
  newPassword: "",
};

const Security = () => {
  const updatePassword = useUpdateUserPassword();

  const [passwords, setPasswords] = useState<UpdatePassword>(initialPasswords);

  const onChangePasswords = useCallback((prop: string, value: string) => {
    setPasswords((prev) => ({
      ...prev,
      [prop]: value,
    }));
  }, []);

  const onUpdatePasswords = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updatePassword.mutate(passwords, {
      onSettled: () => setPasswords(initialPasswords),
    });
  };

  return (
    <section className={`${styles.section} card card-sm`}>
      <div className={styles.sectionHeader}>
        <IconBadge icon={LockKeyhole} size="lg" />

        <div>
          <h1 className={styles.sectionTitle}>Change Password</h1>
          <p className={styles.sectionDescription}>
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      <form className={styles.passwordContainer} onSubmit={onUpdatePasswords}>
        <Input
          required
          label="Current Password"
          id="current-password"
          type="password"
          placeholder="Enter your current password"
          value={passwords?.currentPassword}
          onChange={(e) => onChangePasswords("currentPassword", e.target.value)}
        />

        <Input
          required
          label="New Password"
          id="new-password"
          type="password"
          placeholder="Enter a new password"
          value={passwords?.newPassword}
          onChange={(e) => onChangePasswords("newPassword", e.target.value)}
        />

        <Input
          required
          label="Confirm New Password"
          id="confirm-password"
          type="password"
          placeholder="Re-enter your new password"
          value={passwords?.confirmNewPassword}
          onChange={(e) =>
            onChangePasswords("confirmNewPassword", e.target.value)
          }
        />

        <div className={styles.saveBtn}>
          <Button type="submit">Update Password</Button>
        </div>
      </form>
    </section>
  );
};

export default Security;
