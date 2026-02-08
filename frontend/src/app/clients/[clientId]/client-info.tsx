import { Mail, NotebookPen, Phone } from "lucide-react";

import { IconBadge } from "@/components/ui/icon-badge";
import { Client } from "@/types/models/client";
import { formatDate } from "@/utils/date";

import styles from "./styles.module.css";

interface Props {
  client?: Client;
}

type InfoItem = {
  label: string;
  value?: string;
  fallback: string;
  icon: React.ElementType;
};

const ClientInfo = ({ client }: Props) => {
  const items: InfoItem[] = [
    {
      label: "Email",
      value: client?.email,
      fallback: "NA",
      icon: Mail,
    },
    {
      label: "Phone Number",
      value: client?.whatsappNumber,
      fallback: "NA",
      icon: Phone,
    },
    {
      label: "Notes",
      value: client?.notes,
      fallback: "No notes available",
      icon: NotebookPen,
    },
  ];

  if (items.every((item) => !item.value)) return null;

  return (
    <section className={`card`}>
      <h1 className="title">{client?.fullName}</h1>
      <p className="description">{`Client since: ${formatDate(
        client?.createdAt
      )}`}</p>

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
