import {
  getUserHandler,
  updateUserHandler,
} from "@controllers/user.controller";
import { asyncHandler } from "@middlewares/async-handler";
import { authenticate } from "@middlewares/validate-request";
import Router from "express";

const router = Router();

router.get("/user", authenticate, asyncHandler(getUserHandler));

router.put("/user/:userId", authenticate, asyncHandler(updateUserHandler));

export default router;
