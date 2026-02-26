import { Router } from "express";
import { register, login, me } from "./controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { registerBodySchema, loginBodySchema, } from "./validators/httpSchemas.js";

const router = Router();

router.post("/register", validateBody(registerBodySchema), register);
router.post("/login", validateBody(loginBodySchema), login);
router.get("/me", authMiddleware, me);

export default router;
