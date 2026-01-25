"use client";

import { useState } from "react";

import ProgressStepper from "@/components/progress-stepper";

import styles from "./create.module.css";
import SelectClient from "./select-client";

const CreateDocumentRequest = () => {
  const [progressStep, setProgressStep] = useState(0);

  return (
    <section className={styles.page}>
      <div className={styles.stepperWrapper}>
        <ProgressStepper currentStep={progressStep} />
      </div>

      <SelectClient />
    </section>
  );
};

export default CreateDocumentRequest;
