import { Router } from "express";
import usersController from "./controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, usersController.list.bind(usersController));

export default router;