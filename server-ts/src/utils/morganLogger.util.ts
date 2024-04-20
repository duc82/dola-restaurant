import morgan from "morgan";
import logger from "./logger.util";

const morganLogger = (
  format: "combined" | "common" | "dev" | "short" | "tiny"
) => {
  return morgan(format, {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  });
};

export default morganLogger;
