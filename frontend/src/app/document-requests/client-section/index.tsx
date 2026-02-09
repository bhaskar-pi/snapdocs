"use client";

import { useState } from "react";

import { ClientFormInput } from "@/types/models/client";

import styles from "../styles.module.css";
import NewClient from "./new-client-form";
import SectionFooter from "../section-footer";
import SectionHeader from "../section-header";
import ExistingClient from "./existing-client";

interface Props {
  onNext: () => void;
  onChangeClient: (prop: string, value: string) => void;
  onChangeExistingClient: (client: ClientFormInput) => void;
  client: ClientFormInput;
}

enum ClientMode {
  EXISTING_CLIENT = "existing_client",
  NEW_CLIENT = "new_client",
}

const SelectClient = ({
  onNext,
  onChangeClient,
  onChangeExistingClient,
  client,
}: Props) => {
  const [mode, setMode] = useState<ClientMode>(ClientMode.NEW_CLIENT);

  return (
    <>
      <SectionHeader
        title="Select Client"
        description="Choose an existing client or add a new one"
      />

      <div className={styles.stepActions}>
        <div
          data-active={mode === ClientMode.NEW_CLIENT}
          onClick={() => setMode(ClientMode.NEW_CLIENT)}
        >
          Add New Client
        </div>
        <div
          data-active={mode === ClientMode.EXISTING_CLIENT}
          onClick={() => setMode(ClientMode.EXISTING_CLIENT)}
        >
          Existing Client
        </div>
      </div>

      {mode === ClientMode.NEW_CLIENT && (
        <NewClient client={client} onChange={onChangeClient} />
      )}

      {mode === ClientMode.EXISTING_CLIENT && (
        <ExistingClient onChange={onChangeExistingClient} client={client} />
      )}

      <SectionFooter onNext={onNext} />
    </>
  );
};

export default SelectClient;
