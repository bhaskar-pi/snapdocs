
import { Router } from "express";
import { validateRequest } from "@middlewares/validate-request";
import { loginSchema } from "validators/auth.schema";

const router = Router()

router.post('/login', validateRequest(loginSchema), () => {})
router.post('/register', () => {})

export default router