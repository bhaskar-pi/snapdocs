"use client";

import { useState } from "react";

import { Select } from "@/components/ui/form/select";
import { Client } from "@/types/models/client";

import styles from "../styles.module.css";
import NewClient from "./new-client-form";
import SectionFooter from "../section-footer";
import SectionHeader from "../section-header";

interface Props {
  onNext: () => void;
  onChange: (prop: string, value: string) => void;
  client: Client;
}

enum ClientMode {
  EXISTING_CLIENT = "existing_client",
  NEW_CLIENT = "new_client",
}

const SelectClient = ({ onNext, onChange, client }: Props) => {
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
        <NewClient client={client} onChange={onChange} />
      )}

      {mode === ClientMode.EXISTING_CLIENT && (
        <form className={styles.stepForm}>
          <Select
            id="existing-client"
            label="Client"
            placeholder="Select a client"
            options={[]}
          />
        </form>
      )}

      <SectionFooter onNext={onNext} />
    </>
  );
};

export default SelectClient;
