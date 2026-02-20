import { getDashboardStatsHandler } from "@controllers/dashboard.controller";
import { protectedHandler } from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

router.get(
  "/dashboard/stats",
  authenticate,
  protectedHandler(getDashboardStatsHandler),
);

export default router;
