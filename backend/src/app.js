import express from "express";

const app = express();

app.use(express.json());

// health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
