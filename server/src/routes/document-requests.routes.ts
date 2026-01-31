import { Router } from "express";
import { sendDocRequestHandler } from "@controllers/documents-request.controller";
import { authenticate } from "@middlewares/validate-request";
import { asyncHandler } from "@middlewares/async-handler";

const router = Router();

router.post(
  "/document-requests",
  authenticate,
  asyncHandler(sendDocRequestHandler),
);

export default router;
