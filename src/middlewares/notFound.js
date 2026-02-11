import { AppError } from "../middlewares/errorHandler.js";


export default function notFound(req, res, next) {
    next(new AppError("такой страницы не существует", 404));
}