"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/common/button";
import { Icon } from "@/components/common/icon";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";
import { Client } from "@/types/models/client";

import styles from "../create.module.css";

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
      <div className={styles.stepHeader}>
        <h1>Select Client</h1>
        <p>Choose an existing client or add a new one</p>
      </div>

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

      <div className={styles.stepFooter}>
        <Button variant="secondary" icon={<Icon name={ArrowLeft} />} disabled>
          Previous
        </Button>
        <Button
          iconPosition="right"
          icon={<Icon name={ArrowRight} tone="white" />}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default SelectClient;
