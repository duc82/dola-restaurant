const express = require("express");
require("dotenv").config();
const connectDB = require("./configs/db.config");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./utils/swagger.util");
const morgan = require("morgan");
const logger = require("./utils/logger.util");

const app = express();

// Body parser
app.use(express.json());
// Allow to parse nested object
app.use(express.urlencoded({ extended: true }));
// Http logger
app.use(morgan("tiny", { stream: logger.stream }));

// ip address
app.set("trust proxy", true);

// CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:4173",
    "http://localhost:3000",
    "https://localhost:3000",
    process.env.ORIGIN_CLIENT,
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header({
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "origin, content-type, accept",
    "Access-Control-Allow-Methods":
      "GET, PUT, PATCH, POST, DELETE, HEAD, OPTIONS",
  });
  next();
});

// Cookie parser
app.use(cookieParser());

// Static files
app.use(
  "/",
  express.static("public", {
    cacheControl: true,
    maxAge: 3600000,
  })
);

app.get("/", (req, res) => {
  res.send("Dola Restaurant API");
});

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
app.use("/api/v1", require("./routes/index.route"));

// Not Found
app.use((req, _res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// Error Handler
app.use(require("./middlewares/errorHandler.middleware"));

const startServer = async () => {
  const PORT = process.env.PORT || 5000;

  // Connect to MongoDB
  await connectDB();

  // Start server
  app.listen(PORT, () => logger.info(`Server is running on PORT: ${PORT}!`));
};

startServer();

module.exports = app;
