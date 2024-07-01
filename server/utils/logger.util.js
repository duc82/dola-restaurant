const winston = require("winston");
const { ansi_color_yellow } = require("./ansi_color.util");

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
            `[${info.level.toUpperCase()}] ${
              info.timestamp
            }: ${ansi_color_yellow}${info.message}`
        ),
        winston.format.colorize({ all: true })
      ),
    }),
    new winston.transports.File({
      filename: "combined.log",
    }),
  ],
});

module.exports = logger;
