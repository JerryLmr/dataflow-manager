import express from "express";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);
export default app;
