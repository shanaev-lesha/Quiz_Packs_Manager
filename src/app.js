import express from "express";
import authRouter from "./resources/auth/router.js";
import passport from "./resources/auth/passport.js";
import healthRouter from "./resources/health/router.js";
import notFoundMiddleware from "./middlewares/notFound.js"
import { errorHandler as errorHandlerMiddleware } from "./middlewares/errorHandler.js";
import loggerMiddleware from "./middlewares/logger.js"


const app = express();

app.use(express.json());

app.use(loggerMiddleware);

app.use(passport.initialize());

app.use("/auth", authRouter);

app.use(healthRouter);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

export default app;


