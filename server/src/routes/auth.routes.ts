import { Router } from "express";
import { authenticate, validate } from "@middlewares/validate-request";
import { loginSchema, registerSchema } from "@validators/auth.schema";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerUserHandler,
  updatePasswordHandler,
} from "@controllers/auth.controller";
import { asyncHandler } from "@middlewares/async-handler";

const router = Router();

router.post("/login", validate(loginSchema), loginHandler);
router.post("/register", validate(registerSchema), registerUserHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);
router.post(
  "/update-password",
  authenticate,
  asyncHandler(updatePasswordHandler),
);

export default router;
