import { uploadDocumentHandler } from "@controllers/documents.controller";
import { unProtectedHandler } from "@middlewares/async-handler";
import { upload } from "@middlewares/upload";
import { Router } from "express";

const router = Router();

router.post(
  "/upload-document",
  upload.single("file"),
  unProtectedHandler(uploadDocumentHandler),
);

export default router;
