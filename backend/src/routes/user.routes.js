import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { meController } from "../controllers/user.controller.js";

const router = Router();

router.get("/me", authenticate, meController);

export default router;
