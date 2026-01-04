import { Router } from "express";
import { validate } from "@middlewares/validate-request";
import { loginSchema, registerSchema } from "@validators/auth.schema";
import {
  loginHandler,
  refreshHandler,
  registerUserHandler,
} from "@controllers/auth.controller";

const router = Router();

router.post("/login", validate(loginSchema), loginHandler);
router.post("/register", validate(registerSchema), registerUserHandler);
router.post("/refresh", refreshHandler);

export default router;
