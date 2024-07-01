const winston = require("winston");
const { ansi_color_yellow } = require("./ansi_color.util");

const NODE_ENV = process.env.NODE_ENV || "development";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss A",
    }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss A",
        }),
        winston.format.printf(
          (info) =>
            `[${info.level.toUpperCase()}] ${info.timestamp}: ${
              NODE_ENV === "development" ? ansi_color_yellow : ""
            }${info.message}`
        ),
        winston.format.colorize({
          all: NODE_ENV === "development",
        })
      ),
    }),
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

module.exports = logger;
