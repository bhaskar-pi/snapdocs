export interface FeedbackForm {
  name: string;
  email: string;
  type: "bug" | "feature" | "feedback" | "support";
  message: string;
}
