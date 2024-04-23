const CustomError = require("../utils/error.util");
const logger = require("../utils/logger.util");

module.exports = function (err, _req, res, _next) {
  logger.error(err.message);
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // Unknown error
  return res.status(500).json({
    message: err.message,
  });
};
