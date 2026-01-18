import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = Router();

/**
 * POST /api/auth/login
 */

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
