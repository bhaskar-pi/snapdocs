import { Mail, Phone, Pencil, Edit2, Edit } from "lucide-react";

import { Icon } from "@/components/ui/icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { Client } from "@/types/models/client";
import { formatDate } from "@/utils/date";

import styles from "./styles.module.css";

interface Props {
  client?: Client;
  onEdit?: () => void;
}

const ClientInfo = ({ client }: Props) => {
  if (!client) return null;

  return (
    <section className={`card ${styles.clientInfo}`}>
      <div className={styles.clientHeader}>
        <div>
          <h1 className={styles.clientName}>{client.fullName}</h1>
          <p className={styles.clientMeta}>
            Client since {formatDate(client.createdAt)}
          </p>
        </div>

        <IconBadge
          icon={Edit}
          size="md"
          containerClassName={styles.editBadge}
          mode="soft"
        />
      </div>

      <div className={styles.contactGrid}>
        <div className={styles.contactCard}>
          <Icon name={Mail} tone="default" size={20} />
          <div>
            <p className={styles.label}>Email</p>
            <p className={styles.value}>{client.email || "NA"}</p>
          </div>
        </div>

        <div className={styles.contactCard}>
          <Icon name={Phone} tone="default" size={20} />
          <div>
            <p className={styles.label}>Phone</p>
            <p className={styles.value}>{client.whatsappNumber || "NA"}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientInfo;
