const morgan = require("morgan");
const logger = require("./logger.util");

module.exports = function (format) {
  return morgan(format, {
    stream: {
      write: function (message) {
        if (message.includes("404")) {
          logger.warn(message);
        } else {
          logger.info(message);
        }
      }
    }
  });
};
