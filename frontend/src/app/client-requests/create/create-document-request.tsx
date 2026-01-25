"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/common/button";
import { Icon } from "@/components/common/icon";
import ProgressStepper from "@/components/progress-stepper";

import ChooseTemplate from "./choose-template";
import styles from "./create.module.css";
import SelectClient from "./select-client";

const CreateDocumentRequest = () => {
  const [progressStep, setProgressStep] = useState(0);

  const renderCurrentStep = useCallback((step: number) => {
    switch (step) {
      case 0:
        return <SelectClient />;

      case 1:
        return <ChooseTemplate />;

      default:
        return null;
    }
  }, []);

  return (
    <section className={styles.page}>
      <div className={styles.stepperWrapper}>
        <ProgressStepper currentStep={progressStep} />
      </div>

      <div className={styles.stepContent}>
        {renderCurrentStep(progressStep)}

        <div className={styles.stepFooter}>
          <Button
            variant="secondary"
            icon={<Icon name={ArrowLeft} />}
            onClick={() => setProgressStep(progressStep - 1)}
            disabled={progressStep === 0}
          >
            Previous
          </Button>
          <Button
            iconPosition="right"
            icon={<Icon name={ArrowRight} tone="white" />}
            onClick={() => setProgressStep(progressStep + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreateDocumentRequest;
