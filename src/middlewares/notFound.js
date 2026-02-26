import { AppError } from "../common/appError.js";


export default function notFound(req, res, next) {
    next(new AppError("такой страницы не существует", 404));
}