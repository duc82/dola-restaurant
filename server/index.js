const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/db.config");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.util");
const cors = require("cors");
const logger = require("./utils/logger.util");
const morganLogger = require("./middlewares/morganLogger.middleware");
const useragent = require("express-useragent");

const app = express();

// Body parser
app.use(express.json());
// Allow to parse nested object
app.use(express.urlencoded({ extended: true }));
// User agent
app.use(useragent.express());
// Http logger
app.use(morganLogger());
// CORS
const allowedOrigins = [
  "http://localhost:4173",
  "http://localhost:3000",
  "https://localhost:3000",
  process.env.CLIENT_URL,
];

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
app.use("/api/v1", require("./routes/index.route"));

// Not Found
app.use(require("./middlewares/notFound.middleware"));

// Error Handler
app.use(require("./middlewares/errorHandler.middleware"));

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 5000;

    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => logger.info(`Server is running on PORT: ${PORT}!`));
  } catch (error) {
    logger.error(error.message);
  }
};

startServer();

module.exports = app;
