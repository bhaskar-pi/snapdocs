import {
  deleteClientHandler,
  getClientDetailsHandler,
  getClientsHandler,
  getUserClientsStatsHandler,
  updateClientDetailsHandler,
} from "@controllers/clients.controller";
import { protectedHandler } from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

router.get(
  "/clients/summary",
  authenticate,
  protectedHandler(getUserClientsStatsHandler),
);

router.get(
  "/clients/:clientId",
  authenticate,
  protectedHandler(getClientDetailsHandler),
);

router.get("/clients", authenticate, protectedHandler(getClientsHandler));

router.delete(
  "/clients/:clientId",
  authenticate,
  protectedHandler(deleteClientHandler),
);

router.put(
  "/clients/:clientId",
  authenticate,
  protectedHandler(updateClientDetailsHandler),
);

export default router;
