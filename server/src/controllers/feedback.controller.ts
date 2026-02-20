import { FeedbackInsert } from "@database/schema/feedback.schema";
import { FeedbackPayload } from "@models/payloads/feedback.payload";
import { AuthenticatedUser } from "@models/user";
import { createFeedback } from "@repositories/feedback.repository";
import { AppError } from "@utils/error";

export const submitFeedbackHandler = async ({
  authUser,
  request,
}: {
  authUser: AuthenticatedUser;
  request: FeedbackPayload;
}) => {
  const interimFeedback = {
    userId: authUser?.id,
    userEmail: request.email || authUser?.email,
    userName: request?.name || `${authUser?.firstName} ${authUser?.lastName}`,
    type: request.type,
    message: request.message,
  } as FeedbackInsert;

  await createFeedback(interimFeedback);

  return {
    statusCode: 201,
    message: "We received your feedback. we will contact you with in 24 hours",
  };
};

export const submitPublicFeedbackHandler = async ({
  request,
}: {
  request: FeedbackPayload;
}) => {
  if (!request.email || !request.message) {
    throw new AppError("Missing email or message", 400);
  }

  const interimFeedback = {
    userEmail: request.email,
    userName: request?.name,
    type: request.type,
    message: request.message,
  } as FeedbackInsert;

  await createFeedback(interimFeedback);

  return {
    statusCode: 201,
    message: "We received your feedback. we will contact you with in 24 hours",
  };
};
