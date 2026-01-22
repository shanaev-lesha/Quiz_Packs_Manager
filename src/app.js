import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "works" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

export default app;
