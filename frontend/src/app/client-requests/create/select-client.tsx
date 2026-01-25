"use client";

import { useState } from "react";

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
    </div>
  );
};

export default SelectClient;
