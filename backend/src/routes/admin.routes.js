import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import {
  listUserController,
  setUserActiveController,
} from "../controllers/admin.contoller.js";

const router = Router();

router.get("/users", authenticate, authorize(["ADMIN"]), listUserController);

router.patch(
  "/users/:id/disable",
  authenticate,
  authorize(["ADMIN"]),
  setUserActiveController,
);

export default router;
