import { Router } from "express";
import {
  getClientUploadChecklistItems,
  sendDocRequestHandler,
} from "@controllers/documents-request.controller";
import { authenticate } from "@middlewares/validate-request";
import { asyncHandler } from "@middlewares/async-handler";

const router = Router();

router.post(
  "/document-requests",
  authenticate,
  asyncHandler(sendDocRequestHandler),
);

router.get(
  "/upload-documents/checklist/:token",
  asyncHandler(getClientUploadChecklistItems),
);

export default router;
