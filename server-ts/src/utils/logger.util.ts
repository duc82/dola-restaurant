import winston from "winston";

const logger = winston.createLogger({
  level: "info",

  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: "YYYY-MM-DD, HH:mm:ss A",
        }),
        winston.format.printf(
          (info) =>
            `[${info.level.toUpperCase()}] ${info.timestamp}: ${info.message}`
        ),
        winston.format.colorize({
          all: true,
        })
      ),
    }),

    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

export default logger;
