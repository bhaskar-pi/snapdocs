import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { feedbackApi } from "@/services/feedback.service";
import { FeedbackForm } from "@/types/models/feedback";
import { ApiError } from "@/types/models/misc";
import { getErrorMessage } from "@/utils/api";

export const useSubmitFeedback = () => {
  return useMutation({
    mutationFn: (feedback: FeedbackForm) =>
      feedbackApi.submitFeedback(feedback),

    onSuccess: (_data, variables) => {
      if (variables.type === "support") {
        toast.success(
          "Support request sent. Our team will get back to you shortly.",
        );
      } else {
        toast.success("Thanks for your feedback!");
      }
    },

    onError: (error) => {
      const message = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(message ?? "Failed to submit feedback. Please try again.");
    },
  });
};

export const useSubmitPublicFeedback = () => {
  return useMutation({
    mutationFn: (feedback: FeedbackForm) =>
      feedbackApi.submitPublicFeedback(feedback),

    onSuccess: () => {
      toast.success(
        "Support request sent. Our team will get back to you shortly.",
      );
    },

    onError: (error) => {
      const message = getErrorMessage(error as AxiosError<ApiError>);
      toast.error(message ?? "Failed to submit feedback. Please try again.");
    },
  });
};
