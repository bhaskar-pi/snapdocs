import { Input } from "@/components/ui/form/input";
import { Client } from "@/types/models/client";

import styles from "../styles.module.css";

interface Props {
  client: Client;
  onChange: (prop: string, value: string) => void;
}

const NewClient = ({ client, onChange }: Props) => {
  return (
    <form className={styles.stepForm}>
      <Input
        required
        value={client?.fullName || ""}
        id="client-name"
        label="Full Name"
        placeholder="Enter full name"
        fieldClassName={styles.stepFormInput}
        onChange={(e) => onChange("fullName", e.target.value)}
      />

      <Input
        required
        value={client?.email || ""}
        id="client-email"
        label="Email"
        placeholder="Enter email address"
        fieldClassName={styles.stepFormInput}
        onChange={(e) => onChange("email", e.target.value)}
      />

      <Input
        value={client?.whatsappNumber || ""}
        id="client-phone"
        label="Phone Number (optional)"
        placeholder="Enter phone number"
        fieldClassName={styles.stepFormInput}
        onChange={(e) => onChange("whatsappNumber", e.target.value)}
      />
    </form>
  );
};

export default NewClient;
