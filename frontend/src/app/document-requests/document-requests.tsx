"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";

import ProgressStepper from "@/components/progress-stepper";
import { useCreateRequest } from "@/hooks/requests/documents-request";
import { RequestStatus } from "@/types/enums/request";
import { ClientRequest } from "@/types/models/client";

import SelectClient from "./client-section";
import ChooseTemplate from "./documents-section";
import ReviewAndSend from "./review-section";
import styles from "./styles.module.css";

const DocumentRequests = () => {
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

  const onChangeDocuments = useCallback(
    (name: string, isRequired: boolean, index?: number) => {
      setClientRequest((prev) => {
        const documents = prev.request.documents;

        if (typeof index === "number") {
          return {
            ...prev,
            request: {
              ...prev.request,
              documents: documents.map((doc, i) =>
                i === index ? { ...doc, name, isRequired } : doc,
              ),
            },
          };
        }

        return {
          ...prev,
          request: {
            ...prev.request,
            documents: [...documents, { name, isRequired }],
          },
        };
      });
    },
    [],
  );

  const onRemoveDocument = useCallback((name: string) => {
    setClientRequest((prev) => ({
      ...prev,
      request: {
        ...prev.request,
        documents: prev.request.documents.filter((doc) => doc.name !== name),
      },
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
      Boolean(clientRequest.client.email) &&
      Boolean(clientRequest.client.fullName);

    if (!isClientValid) {
      toast.error("Please provide the client details.");
      return;
    }

    incrementProgressStep();
  }, [clientRequest.client, incrementProgressStep]);

  const onNextFromDocuments = useCallback(() => {
    if (clientRequest.request.documents.length === 0) {
      toast.error("Please add at least one document to continue.");
      return;
    }

    incrementProgressStep();
  }, [clientRequest.request.documents.length, incrementProgressStep]);

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
            onNext={onNextFromDocuments}
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
            isLoading={sendRequest.isPending}
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

export default DocumentRequests;
