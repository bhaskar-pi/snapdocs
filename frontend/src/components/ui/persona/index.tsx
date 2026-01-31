"use client";

import React from "react";

import styles from "./persona.module.css";

interface PersonaProps {
  name: string;
  subText?: string;
  size?: "sm" | "md";
}

export function Persona({ name, subText, size = "sm" }: PersonaProps) {
  const letter = name.charAt(0).toUpperCase();

  return (
    <div className={`${styles.persona} ${styles[size]}`}>
      <div className={`${styles.avatar} ${styles.slate}`}>{letter}</div>

      <div className={styles.details}>
        <p className={styles.name}>{name}</p>
        {subText && <span className={styles.subText}>{subText}</span>}
      </div>
    </div>
  );
}
