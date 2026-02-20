import {
  getDocumentUrlHandler,
  uploadDocumentHandler,
} from "@controllers/documents.controller";
import {
  protectedHandler,
  unProtectedHandler,
} from "@middlewares/async-handler";
import { upload } from "@middlewares/upload";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

/** document upload by client */
router.post(
  "/documents/upload/:token",
  upload.single("file"),
  unProtectedHandler(uploadDocumentHandler),
);

/** url fetch by user/admin */
router.get(
  "/documents/:documentId/url",
  authenticate,
  protectedHandler(getDocumentUrlHandler),
);

export default router;
