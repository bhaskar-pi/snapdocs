import { Mail, Phone, Edit } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/form/input";
import { Icon } from "@/components/ui/icon";
import { IconBadge } from "@/components/ui/icon-badge";
import { Modal } from "@/components/ui/modal";
import { useUpdateClient } from "@/hooks/data/clients/use-clients";
import { Client } from "@/types/models/client";
import { formatDate } from "@/utils/date";

import styles from "./styles.module.css";

interface Props {
  client?: Client;
  onEdit?: () => void;
}

const ClientInfo = ({ client }: Props) => {
  const updateClient = useUpdateClient();
  const isLoading = updateClient.isPending;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState<Client | null>(null);

  if (!client) return null;

  const onOpenEditModal = () => {
    setClientDetails(client);
    setIsEditOpen(true);
  };

  const onCloseModal = () => {
    setClientDetails(null);
    setIsEditOpen(false);
  };

  const onChangeClient = <K extends keyof Client>(
    prop: K,
    value: Client[K],
  ) => {
    setClientDetails((prev) => (prev ? { ...prev, [prop]: value } : prev));
  };

  const onUpdateClient = () => {
    if (!clientDetails?.id) return;

    updateClient.mutate(
      {
        clientId: clientDetails.id,
        clientDetails: {
          fullName: clientDetails.fullName,
          email: clientDetails.email,
          whatsappNumber: clientDetails.whatsappNumber,
        },
      },
      {
        onSuccess() {
          onCloseModal();
        },
      },
    );
  };

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
          onClick={onOpenEditModal}
          disabled={isLoading}
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

      <Modal
        open={isEditOpen && !!clientDetails}
        title="Edit Client"
        type="primary"
        onClose={onCloseModal}
        onSave={{
          label: "Update",
          onClick: onUpdateClient,
          isLoading,
          disabled: isLoading,
        }}
        onDismiss={{
          label: "Dismiss",
          onClick: onCloseModal,
          disabled: isLoading,
        }}
      >
        {clientDetails && (
          <form>
            <div className="d-flex gap-3">
              <Input
                required
                id="name"
                type="text"
                label="Full Name"
                value={clientDetails.fullName}
                onChange={(e) => onChangeClient("fullName", e.target.value)}
              />
              <Input
                required
                id="email"
                type="email"
                label="Email"
                value={clientDetails.email}
                onChange={(e) => onChangeClient("email", e.target.value)}
              />
            </div>
            <div className="d-flex gap-3">
              <Input
                id="whatsappNumber"
                type="text"
                label="Phone Number"
                value={clientDetails.whatsappNumber || ""}
                onChange={(e) =>
                  onChangeClient("whatsappNumber", e.target.value)
                }
              />
            </div>
          </form>
        )}
      </Modal>
    </section>
  );
};

export default ClientInfo;
