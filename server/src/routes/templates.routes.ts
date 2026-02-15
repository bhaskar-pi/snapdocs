import {
  createTemplateHandler,
  deleteTemplateHandler,
  getTemplateHandler,
  getTemplatesHandler,
  updateTemplateHandler,
} from "@controllers/templates.controller";
import { protectedHandler } from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

router.post(
  "/templates",
  authenticate,
  protectedHandler(createTemplateHandler),
);

router.put(
  "/templates/:templateId",
  authenticate,
  protectedHandler(updateTemplateHandler),
);

router.get(
  "/templates/:templateId",
  authenticate,
  protectedHandler(getTemplateHandler),
);

router.get("/templates", authenticate, protectedHandler(getTemplatesHandler));

router.delete(
  "/templates/:templateId",
  authenticate,
  protectedHandler(deleteTemplateHandler),
);

export default router;
