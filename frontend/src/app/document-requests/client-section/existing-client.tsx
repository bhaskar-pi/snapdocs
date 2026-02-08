import { Select } from "@/components/ui/form/select";
import { useClients } from "@/hooks/data/clients/use-clients";
import { ClientFormInput } from "@/types/models/client";

import styles from "../styles.module.css";

interface Props {
  client: ClientFormInput;
  onChange: (client: ClientFormInput) => void;
}

const ExistingClient = ({ client, onChange }: Props) => {
  const { data: clients, isLoading } = useClients();

  const clientOptions =
    clients?.map((client) => ({
      label: `${client.fullName} (${client.email})`,
      value: client.email,
    })) ?? [];

  const onSelectClient = (email: string) => {
    const selectedClient = clients?.find((c) => c.email === email);

    onChange({
      fullName: selectedClient?.fullName || "",
      email: selectedClient?.email || "",
      whatsappNumber: selectedClient?.whatsappNumber,
    });
  };

  return (
    <form className={styles.stepForm}>
      <Select
        value={client.email}
        isLoading={isLoading}
        id="existing-client"
        label="Client"
        placeholder={isLoading ? "Loading Clients..." : "Select a client"}
        options={clientOptions}
        disabled={isLoading}
        onChange={(email) => onSelectClient(email)}
      />
    </form>
  );
};

export default ExistingClient;
