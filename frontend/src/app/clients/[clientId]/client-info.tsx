import { Mail, NotebookPen, Phone } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";

import styles from "./styles.module.css";

interface Props {
  email?: string;
  phoneNumber?: string;
  notes?: string;
}

type InfoItem = {
  label: string;
  value?: string;
  fallback: string;
  icon: React.ElementType;
};

const ClientInfo = ({ email, phoneNumber, notes }: Props) => {
  const items: InfoItem[] = [
    {
      label: "Email",
      value: email,
      fallback: "NA",
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: phoneNumber,
      fallback: "NA",
      icon: Phone,
    },
    {
      label: "Notes",
      value: notes,
      fallback: "No notes available",
      icon: NotebookPen,
    },
  ];

  if (items.every((item) => !item.value)) return null;

  return (
    <section className={`${styles.clientInfo} card`}>
      <h1>Contact Information</h1>

      <div className={styles.clientInfoRow}>
        {items.map(({ label, value, fallback, icon }) => (
          <div key={label} className={styles.infoContainer}>
            <IconBadge icon={icon} />
            <div className={styles.info}>
              <p className="label">{label}</p>
              <p className="value">{value || fallback}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientInfo;
