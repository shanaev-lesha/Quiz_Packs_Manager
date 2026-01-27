import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("запрос получен");
  next();
});

app.get("/health", (req, res) => {
  res.status(200).send();
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
      });

// TODO create controller for throwing errors

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
});

export default app;
