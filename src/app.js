import express from "express";
import usersRouter from './resources/users/router.js';
import authRouter from "./resources/auth/router.js";
import passport from "./resources/auth/passport.js";


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

app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.get("/health", (req, res) => {
  res.status(200).send();
});

app.use((req, res, next) => {
  next(new AppError('такой страницы не существует', 404));
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(err.status || 500).json({
    error: err.message || 'Server error',
  });
});

export default app;


