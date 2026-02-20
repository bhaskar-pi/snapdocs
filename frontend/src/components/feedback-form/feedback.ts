export type FeedbackType = "feedback" | "support";

export const MODAL_CONTENT: Record<
  FeedbackType,
  { title: string; description: string; buttonLabel: string }
> = {
  feedback: {
    title: "Send Feedback",
    description:
      "Found a bug or have a suggestion? We'd love to hear from you.",
    buttonLabel: "Send Feedback",
  },
  support: {
    title: "Contact Support",
    description:
      "Need help with something? Describe your issue and we’ll assist you.",
    buttonLabel: "Send Support Request",
  },
};
