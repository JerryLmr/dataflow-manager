import express from "express";
import pool from "./models/db.js";
const app = express();

app.use(express.json());

(async () => {
  try {
    const [rows] = await pool.query("select 1");
    console.log("✅ MySQL connected");
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();
// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
