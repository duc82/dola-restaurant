import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morganLogger from "./utils/morganLogger.util";
import swaggerSpec from "./utils/swagger.util";
import logger from "./utils/logger.util";
import notFoundMiddleware from "./middlewares/notFound.middleware";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware";
import connectDB from "./configs/db.config";
import indexRoute from "./routes/index.route";

const app = express();

// Body parser
app.use(express.json());
// Allow to parse nested object
app.use(express.urlencoded({ extended: true }));
// Http logger
app.use(
  morganLogger(process.env.NODE_ENV === "production" ? "combined" : "dev")
);

// ip address
app.set("trust proxy", true);

// CORS
const allowedOrigins = [process.env.CLIENT_URL ?? "", "http://localhost:3000"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Cookie parser
app.use(cookieParser());

// Static files
app.use("/", express.static("public"));

// Swagger
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customfavIcon: "/favicon.ico",
    customSiteTitle: "Dola Restaurant Swagger API",
  })
);

// Routes
app.get("/", (_req, res) => {
  res.send("Dola Restaurant API");
});
app.use("/api/v1", indexRoute);

// Not Found
app.use(notFoundMiddleware);

// Error Handler
app.use(errorHandlerMiddleware);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => logger.info(`Server is running on PORT: ${PORT}!`));
  } catch (error) {
    logger.error(`Error: ${(error as Error).message}`);
    process.exit(1);
  }
};

startServer();

export default app;
