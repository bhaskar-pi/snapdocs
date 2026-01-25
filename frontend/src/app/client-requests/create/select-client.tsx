"use client";

import { useState } from "react";

import { Button } from "@/components/common/button";
import { Input } from "@/components/form/input";
import { Select } from "@/components/form/select";

import styles from "./create.module.css";

enum ClientAction {
  EXISTING = "Existing Clients",
  ADD_NEW = "Add New Client",
}

const SelectClient = () => {
  const [action, setAction] = useState<ClientAction>(ClientAction.EXISTING);

  return (
    <div className={styles.formContainer}>
      <div className={styles.stepHeader}>
        <h1>Select Client</h1>
        <p>Choose an existing client or add a new one</p>
      </div>
      <div className={styles.clientActions}>
        <div
          is-active={`${action === ClientAction.EXISTING}`}
          onClick={() => setAction(ClientAction.EXISTING)}
        >
          {ClientAction.EXISTING}
        </div>
        <div
          is-active={`${action === ClientAction.ADD_NEW}`}
          onClick={() => setAction(ClientAction.ADD_NEW)}
        >
          {ClientAction.ADD_NEW}
        </div>
      </div>
      {action === ClientAction.EXISTING && (
        <form className={styles.clientForm}>
          <Select id="existing-clients" label="Clients" options={[]} />
        </form>
      )}

      {action === ClientAction.ADD_NEW && (
        <form className={styles.clientForm}>
          <Input
            required
            id="client-full-name"
            label="Full Name"
            placeholder="Enter full name"
            filedClassName={styles.inputFiled}
          />
          <Input
            required
            id="client-full-name"
            label="Email"
            placeholder="Enter email address"
            filedClassName={styles.inputFiled}
          />
          <Input
            required
            id="client-full-name"
            label="Phone Number (optional)"
            placeholder="Enter phone number"
            filedClassName={styles.inputFiled}
          />
        </form>
      )}

      <div className={styles.formActions}>
        <p></p>
        <Button>Next</Button>
      </div>
    </div>
  );
};

export default SelectClient;
