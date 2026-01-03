import { Router } from "express";
import { validate } from "@middlewares/validate-request";
import { loginSchema, registerSchema } from "validators/auth.schema";
import { register } from "@controllers/auth.controller";

const router = Router();

router.post("/login", validate(loginSchema), () => {});
router.post("/register", validate(registerSchema), register);

export default router;
