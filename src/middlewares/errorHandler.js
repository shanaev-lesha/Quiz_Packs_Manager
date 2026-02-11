export class AppError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}

export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        error: err.message || "Server error",
    });
}
