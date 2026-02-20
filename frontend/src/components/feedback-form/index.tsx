"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/form/input";
import { Select } from "@/components/ui/form/select";
import { TextArea } from "@/components/ui/form/text-area";
import { Modal } from "@/components/ui/modal";
import { useSubmitFeedback } from "@/hooks/data/feedback/use-feedback";
import { useAuthStore } from "@/store/auth.store";
import { FeedbackForm as Feedback } from "@/types/models/feedback";

import { FeedbackType, MODAL_CONTENT } from "./feedback";

interface FeedbackModalProps {
  open: boolean;
  type: FeedbackType;
  onClose: () => void;
}

export const FEEDBACK_TYPE_OPTIONS = [
  { value: "feedback", label: "General Feedback" },
  { value: "bug", label: "Report a Bug" },
  { value: "feature", label: "Feature Request" },
];

const initialState: Feedback = {
  name: "",
  email: "",
  type: "feedback",
  message: "",
};

export const FeedbackForm = ({ open, onClose, type }: FeedbackModalProps) => {
  const user = useAuthStore((store) => store.user);
  const submitFeedback = useSubmitFeedback();

  const [form, setForm] = useState<Feedback>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof Feedback, string>>>(
    {},
  );

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!form.name.trim() && !user?.firstName) {
      newErrors.name = "Name is required";
    }
    if (!form.email.trim() && !user?.email) {
      newErrors.email = "Email is required";
    }
    if (!form.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (key: keyof Feedback, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    submitFeedback.mutate(
      { ...form, type: type === "support" ? "support" : form.type },
      {
        onSuccess() {
          setForm(initialState);
          onClose();
        },
      },
    );
  };

  const modalContent = MODAL_CONTENT[type];

  return (
    <Modal
      type="primary"
      open={open}
      onClose={onClose}
      title={modalContent.title}
      description={modalContent.description}
      onDismiss={{
        label: "Cancel",
        onClick: () => {
          setForm(initialState);
          onClose();
        },
      }}
      onSave={{
        label: modalContent.buttonLabel,
        onClick: handleSubmit,
        isLoading: submitFeedback.isPending,
        disabled: submitFeedback.isPending,
      }}
      size="medium"
    >
      <form className="gap-2">
        {!user?.firstName && (
          <Input
            id="feedback-name"
            label="Your Name"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            message={errors.name}
            messageType={errors.name ? "error" : undefined}
          />
        )}

        {!user?.email && (
          <Input
            id="feedback-email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            message={errors.email}
            messageType={errors?.email ? "error" : undefined}
          />
        )}

        {type === "feedback" && (
          <Select
            id="feedback"
            label="Type"
            options={FEEDBACK_TYPE_OPTIONS}
            onChange={(value) => handleChange("type", value)}
            value={form.type}
          />
        )}

        <TextArea
          id="feedback-message"
          label="Message"
          placeholder="Describe the issue or suggestion..."
          rows={4}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
          message={errors.message}
          messageType={errors?.message ? "error" : undefined}
        />
      </form>
    </Modal>
  );
};
