const morgan = require("morgan");
const logger = require("../utils/logger.util");
const {
  ansi_color_yellow,
  ansi_color_cyan,
  ansi_color_magenta,
  ansi_color_green,
} = require("../utils/ansi_color.util");
require("dotenv").config();

const dev = `${ansi_color_yellow}:method ${ansi_color_cyan}:url :statusColor ${ansi_color_green}:response-time ms - ${ansi_color_yellow}:contentLength - ${ansi_color_magenta}Device: :device`;
const combined = "combined";

const formatBytes = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

module.exports = function () {
  morgan.token("device", (req) => {
    const userAgent = req.useragent;
    const device = userAgent.isMobile
      ? "Mobile"
      : userAgent.isTablet
      ? "Tablet"
      : "Desktop";
    return device;
  });

  morgan.token("statusColor", (_req, res) => {
    const status = (
      typeof res.headersSent !== "boolean"
        ? Boolean(res.header)
        : res.headersSent
    )
      ? res.statusCode
      : undefined;

    // get status color
    const color =
      status >= 500
        ? 31 // red
        : status >= 400
        ? 33 // yellow
        : status >= 300
        ? 36 // cyan
        : status >= 200
        ? 32 // green
        : 0; // no color

    return "\x1b[" + color + "m" + status + "\x1b[0m";
  });

  morgan.token("contentLength", (_req, res) => {
    const contentLength = res.getHeader("content-length");
    if (!contentLength) return "-";
    return formatBytes(+contentLength);
  });

  return morgan(process.env.NODE_ENV === "production" ? combined : dev, {
    stream: {
      write: function (message) {
        logger.info(message);
      },
    },
  });
};
