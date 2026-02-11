import express from "express";
import authRouter from "./resources/auth/router.js";
import passport from "./resources/auth/passport.js";
import healthRoutes from "./resources/feel/router.js";
import notFound from "./middlewares/notFound.js"
import { errorHandler } from "./middlewares/errorHandler.js";
import logger from "./middlewares/logger.js"


const app = express();

app.use(express.json());

app.use(logger);

app.use(passport.initialize());

app.use("/auth", authRouter);

app.use(healthRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;


