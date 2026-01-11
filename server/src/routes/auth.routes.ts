import { Router } from "express";
import { authenticate, validate } from "@middlewares/validate-request";
import { loginSchema, registerSchema } from "@validators/auth.schema";
import {
  loginHandler,
  logoutHandler,
  refreshHandler,
  registerUserHandler,
} from "@controllers/auth.controller";

const router = Router();

router.post("/login", validate(loginSchema), loginHandler);
router.post("/register", validate(registerSchema), registerUserHandler);
router.post("/refresh", refreshHandler);
router.post("/logout", logoutHandler);

export default router;
