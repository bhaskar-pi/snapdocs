import { uploadDocumentHandler } from "@controllers/documents.controller";
import { asyncHandler } from "@middlewares/async-handler";
import { upload } from "@middlewares/upload";
import { Router } from "express";

const router = Router();

router.post(
  "/upload-document",
  upload.single("file"),
  asyncHandler(uploadDocumentHandler),
);

export default router;
