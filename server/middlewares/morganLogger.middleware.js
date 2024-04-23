const morgan = require("morgan");
const logger = require("../utils/logger.util");

module.exports = function (format) {
  return morgan(format, {
    stream: {
      write: function (message) {
        logger.info(message);
      },
    },
  });
};
