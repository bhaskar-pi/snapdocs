import {
  getUserHandler,
  updateUserHandler,
} from "@controllers/user.controller";
import { protectedHandler } from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import { Router } from "express";

const router = Router();

router.get("/user", authenticate, protectedHandler(getUserHandler));

router.put("/user/:userId", authenticate, protectedHandler(updateUserHandler));

export default router;
