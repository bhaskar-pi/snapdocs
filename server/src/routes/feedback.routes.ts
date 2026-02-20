import {
  submitFeedbackHandler,
  submitPublicFeedbackHandler,
} from "@controllers/feedback.controller";
import {
  protectedHandler,
  unProtectedHandler,
} from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

router.post("/feedback", authenticate, protectedHandler(submitFeedbackHandler));

router.post(
  "/feedback/public",
  unProtectedHandler(submitPublicFeedbackHandler),
);

export default router;
