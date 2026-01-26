"use client";

import { use, useCallback, useState } from "react";
import { toast } from "sonner";

import ProgressStepper from "@/components/progress-stepper";
import { useCreateRequest } from "@/hooks/requests/create-request";
import { RequestStatus } from "@/types/enums/request";
import { Client, ClientRequest } from "@/types/models/client";
import { Document } from "@/types/models/document";

import ChooseTemplate from "./choose-template";
import styles from "./create.module.css";
import ReviewAndSend from "./review-and-send";
import SelectClient from "./select-client";

const CreateDocumentRequest = () => {
  const sendRequest = useCreateRequest();

  const [progressStep, setProgressStep] = useState(0);
  const [clientRequest, setClientRequest] = useState<ClientRequest>({
    client: {
      email: "",
      fullName: "",
      whatsappNumber: "",
    },
    request: {
      documents: [],
      title: "",
      description: "",
      dueDate: "",
      status: RequestStatus.PENDING,
    },
  });

  const incrementProgressStep = useCallback(
    () => setProgressStep((prev) => prev + 1),
    [],
  );

  const decrementProgressStep = useCallback(
    () => setProgressStep((prev) => prev - 1),
    [],
  );

  const onChangeClient = useCallback((prop: string, value: string) => {
    setClientRequest((prev) => ({
      ...prev,
      client: {
        ...prev.client,
        [prop]: value,
      },
    }));
  }, []);

  const onChangeDocuments = useCallback((name: string, isRequired: boolean) => {
    setClientRequest((prev) => {
      const exists = prev?.request.documents?.some((doc) => doc.name === name);

      return {
        ...prev,
        request: {
          ...prev.request,
          documents: exists
            ? prev?.request.documents?.map((doc) =>
                doc.name === name ? { ...doc, isRequired } : doc,
              )
            : [...prev.request.documents, { name, isRequired }],
        },
      };
    });
  }, []);

  const onRemoveDocument = useCallback((name: string) => {
    setClientRequest((prev) => ({
      ...prev,
      documents: prev.request.documents.filter((doc) => doc.name !== name),
    }));
  }, []);

  const onChangeRequest = useCallback((key: string, value: string | Date) => {
    setClientRequest((prev) => ({
      ...prev,
      request: {
        ...prev.request,
        [key]: value,
      },
    }));
  }, []);

  const onNextFromClient = useCallback(() => {
    const isClientValid =
      Boolean(clientRequest?.client?.email) &&
      Boolean(clientRequest?.client?.fullName);

    if (!isClientValid) {
      toast.error("Please provide the client details.");
    }

    incrementProgressStep();
  }, [
    clientRequest?.client?.email,
    clientRequest?.client?.fullName,
    incrementProgressStep,
  ]);

  const onSendRequest = useCallback(() => {
    sendRequest.mutate(clientRequest);
  }, [clientRequest, sendRequest]);

  const renderCurrentStep = (step: number) => {
    switch (step) {
      case 0:
        return (
          <SelectClient
            onChange={onChangeClient}
            onNext={onNextFromClient}
            client={clientRequest.client}
          />
        );

      case 1:
        return (
          <ChooseTemplate
            onNext={incrementProgressStep}
            onPrevious={decrementProgressStep}
            onChange={onChangeDocuments}
            documents={clientRequest.request.documents}
            onRemove={onRemoveDocument}
          />
        );
      case 2:
        return (
          <ReviewAndSend
            onPrevious={decrementProgressStep}
            onSendRequest={onSendRequest}
            onChange={onChangeRequest}
            documents={clientRequest?.request.documents}
            clientName={clientRequest?.client?.fullName}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className={styles.page}>
      <div className={styles.stepperWrapper}>
        <ProgressStepper currentStep={progressStep} />
      </div>

      <div className={styles.stepContent}>
        {renderCurrentStep(progressStep)}
      </div>
    </section>
  );
};

export default CreateDocumentRequest;
