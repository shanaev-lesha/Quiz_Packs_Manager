import express from "express";

class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}


const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("запрос получен");
  next();
});

app.get("/health", (req, res) => {
  res.status(200).send();
});

app.use((req, res, next) => {
  next(new AppError('такой страницы не существует', 404));
});

// TODO create controller for throwing errors

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500).json({
    error: err.message || 'Server error',
  });
});

export default app;
