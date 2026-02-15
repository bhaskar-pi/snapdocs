import { Router } from "express";
import {
  getUploadRequestDetailsHandler,
  sendDocumentsRequestHandler,
} from "@controllers/documents-request.controller";
import { authenticate } from "@middlewares/validate-request";
import {
  protectedHandler,
  unProtectedHandler,
} from "@middlewares/async-handler";

const router = Router();

router.post(
  "/document-requests",
  authenticate,
  protectedHandler(sendDocumentsRequestHandler),
);

router.get(
  "/upload-documents/checklist/:token",
  unProtectedHandler(getUploadRequestDetailsHandler),
);

export default router;
