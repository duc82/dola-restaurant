const CustomError = require("../utils/error.util");

function errorHandlerMiddleware(err, _req, res, _next) {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // Unknown error
  return res.status(500).json({
    message: err.message,
  });
}

module.exports = errorHandlerMiddleware;
