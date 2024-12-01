const { rateLimit } = require("express-rate-limit");

const lowLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
  message: {
    status: "error",
    message: "Quá nhiều yêu cầu, vui lòng thử lại sau 1 phút",
  },
  standardHeaders: true,
});

const mediumLimiter = rateLimit({
  windowMs: 3 * 60 * 1000,
  max: 50,
  message: {
    status: "error",
    message: "Quá nhiều yêu cầu, vui lòng thử lại sau 3 phút",
  },
  standardHeaders: true,
});

const highLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 200,
  message: {
    status: "error",
    message: "Quá nhiều yêu cầu, vui lòng thử lại sau 5 phút",
  },
  standardHeaders: true,
});

module.exports = { lowLimiter, mediumLimiter, highLimiter };
