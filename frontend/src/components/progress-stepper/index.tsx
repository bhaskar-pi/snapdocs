import { Check, FileText, SearchCheck, User } from "lucide-react";

import styles from "./progress-stepper.module.css";
import { IconBadge } from "../common/icon-badge";

interface Props {
  currentStep: number; // 0-based index
}

const steps = [
  { title: "Select Client", icon: User },
  { title: "Choose Template", icon: FileText },
  { title: "Review & Send", icon: SearchCheck },
];

const ProgressStepper = ({ currentStep }: Props) => {
  return (
    <div className={styles.container}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;
        const isDisabled = index > currentStep;

        return (
          <div key={step.title} className={styles.stepper}>
            <div className={styles.step}>
              <IconBadge
                icon={isCompleted ? Check : step.icon}
                size="md"
                variant={"primary"}
                disabled={isDisabled}
                containerClassName={styles.icon}
              />
              <p
                className={[
                  isActive ? styles.active : "",
                  isDisabled ? styles.disabledText : "",
                ].join(" ")}
              >
                {step.title}
              </p>
            </div>

            {index !== steps.length - 1 && (
              <hr
                className={[
                  styles.divider,
                  isCompleted ? styles.dividerActive : "",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProgressStepper;
