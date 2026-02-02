import express from "express";
import knex from '../knex.js';
import bcrypt from 'bcrypt';

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

app.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('требуется адрес электронной почты и пароль', 400);
    }

    const existing = await knex('users').where({ email }).first();
    if (existing) {
      throw new AppError('эта электронная почта уже существует', 409);
    }

    const password_hash = await bcrypt.hash(password, 10);

    const [user] = await knex('users')
      .insert({ email, password_hash })
      .returning(['id', 'email', 'created_at']);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

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
