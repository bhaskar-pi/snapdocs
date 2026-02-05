import {
  getClientDetailsHandler,
  getClientsHandler,
  getClientsSummariesHandler,
} from "@controllers/clients.controller";
import { asyncHandler } from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

router.get(
  "/clients/summary",
  authenticate,
  asyncHandler(getClientsSummariesHandler),
);

router.get(
  "/clients/:clientId",
  authenticate,
  asyncHandler(getClientDetailsHandler),
);

router.get("/clients", authenticate, asyncHandler(getClientsHandler));

export default router;
