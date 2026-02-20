type FeedbackType = "feedback" | "support";

export interface FeedbackPayload {
  name?: string;
  email?: string;
  type: FeedbackType;
  message: string;
}
