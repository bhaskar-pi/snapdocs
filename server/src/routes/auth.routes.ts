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
import { asyncHandler, protectedHandler } from "@middlewares/async-handler";

const router = Router();

router.post("/login", validate(loginSchema), asyncHandler(loginHandler));
router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(registerUserHandler),
);
router.post("/refresh", asyncHandler(refreshHandler));
router.post("/logout", logoutHandler);
router.post(
  "/update-password",
  authenticate,
  protectedHandler(updatePasswordHandler),
);

export default router;
