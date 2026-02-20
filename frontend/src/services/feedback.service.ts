import { POST } from "@/api/http";
import { FeedbackForm } from "@/types/models/feedback";
import { ApiResponse } from "@/types/models/misc";

export const feedbackApi = {
  submitFeedback(feedback: FeedbackForm) {
    return POST<ApiResponse<void>>("/feedback", feedback);
  },

  submitPublicFeedback(feedback: FeedbackForm) {
    return POST<ApiResponse<void>>("/feedback/public", feedback);
  },
};
