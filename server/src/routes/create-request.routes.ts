import { Router } from "express";
import { sendDocRequestHandler } from "@controllers/create-doc-request.controller";
import { authenticate } from "@middlewares/validate-request";
import { asyncHandler } from "@middlewares/async-handler";

const router = Router();

router.post(
  "/user/send-docs-request",
  authenticate,
  asyncHandler(sendDocRequestHandler),
);

export default router;
