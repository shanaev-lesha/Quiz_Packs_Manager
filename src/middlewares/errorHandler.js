export function errorHandler(err, _req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || 'Server error'
  });
}
