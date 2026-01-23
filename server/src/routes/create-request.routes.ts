import { Router } from "express";
import { createDocRequestHandler } from "@controllers/create-doc-request.controller";
import { authenticate } from "@middlewares/validate-request";
import { asyncHandler } from "@middlewares/async-handler";

const router = Router();

router.post(
  "/create-request",
  authenticate,
  asyncHandler(createDocRequestHandler)
);
