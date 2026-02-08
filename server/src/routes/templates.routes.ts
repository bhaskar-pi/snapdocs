import {
  createTemplateHandler,
  deleteTemplateHandler,
  getTemplateHandler,
  getTemplatesHandler,
  updateTemplateHandler,
} from "@controllers/templates.controller";
import { asyncHandler } from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

router.post("/templates", authenticate, asyncHandler(createTemplateHandler));
router.put(
  "/templates/:templateId",
  authenticate,
  asyncHandler(updateTemplateHandler)
);
router.get(
  "/templates/:templateId",
  authenticate,
  asyncHandler(getTemplateHandler)
);
router.get("/templates", authenticate, asyncHandler(getTemplatesHandler));
router.delete(
  "/templates/:templateId",
  authenticate,
  asyncHandler(deleteTemplateHandler)
);

export default router;
