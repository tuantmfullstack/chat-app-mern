import AppError from '../utils/appError.js';

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.code === 11000)
    err = new AppError(
      `${err.keyValue.email} has existed. Please choose another email.`,
      500
    );

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

export default errorController;
