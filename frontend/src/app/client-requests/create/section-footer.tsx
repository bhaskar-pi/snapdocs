import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

import styles from "./create.module.css";

interface Props {
  isLoading?: boolean;
  text?: string;
  onNext?: () => void;
  onPrevious?: () => void;
}

const SectionFooter = ({ onNext, onPrevious, isLoading, text }: Props) => {
  return (
    <div className={styles.stepFooter}>
      {onPrevious ? (
        <Button
          intent="secondary"
          icon={<Icon name={ArrowLeft} />}
          onClick={onPrevious}
        >
          Previous
        </Button>
      ) : (
        <div></div>
      )}
      {onNext ? (
        <Button
          loading={isLoading}
          iconPosition="right"
          icon={<Icon name={ArrowRight} />}
          onClick={onNext}
        >
          {text ?? "Next"}
        </Button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default SectionFooter;
