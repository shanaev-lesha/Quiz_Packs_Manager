import express from "express";
import authRouter from "./resources/auth/router.js";
import passport from "./resources/auth/passport.js";
import healthRouter from "./resources/health/router.js";
import notFoundMiddleware from "./middlewares/notFound.js"
import { errorHandler as errorHandlerMiddleware } from "./middlewares/errorHandler.js";
import loggerMiddleware from "./middlewares/logger.js"
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";


const app = express();

const swaggerFile = JSON.parse(
    fs.readFileSync(new URL("../swagger_output.json", import.meta.url))
);

app.use(express.json());

app.use(loggerMiddleware);

app.use(passport.initialize());

app.use("/auth", authRouter);

app.use(healthRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

export default app;


