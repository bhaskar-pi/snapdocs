"use client";

import { useState } from "react";

import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";

import styles from "./create.module.css";

enum ClientMode {
  EXISTING_CLIENT = "existing_client",
  NEW_CLIENT = "new_client",
}

const SelectClient = () => {
  const [mode, setMode] = useState<ClientMode>(ClientMode.EXISTING_CLIENT);

  return (
    <>
      <div className={styles.stepHeader}>
        <h1>Select Client</h1>
        <p>Choose an existing client or add a new one</p>
      </div>

      <div className={styles.stepActions}>
        <div
          data-active={mode === ClientMode.EXISTING_CLIENT}
          onClick={() => setMode(ClientMode.EXISTING_CLIENT)}
        >
          Existing Client
        </div>

        <div
          data-active={mode === ClientMode.NEW_CLIENT}
          onClick={() => setMode(ClientMode.NEW_CLIENT)}
        >
          Add New Client
        </div>
      </div>

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

      {mode === ClientMode.NEW_CLIENT && (
        <form className={styles.stepForm}>
          <Input
            required
            id="client-name"
            label="Full Name"
            placeholder="Enter full name"
            fieldClassName={styles.stepFormInput}
          />

          <Input
            required
            id="client-email"
            label="Email"
            placeholder="Enter email address"
            fieldClassName={styles.stepFormInput}
          />

          <Input
            id="client-phone"
            label="Phone Number (optional)"
            placeholder="Enter phone number"
            fieldClassName={styles.stepFormInput}
          />
        </form>
      )}
    </>
  );
};

export default SelectClient;
