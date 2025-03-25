require("dotenv").config();
const { connect } = require("mongoose");
const logger = require("../utils/logger.util");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error("Please provide MONGODB_URI in .env");
  process.exit(1);
}

const connectDB = async () => {
  try {
    const db = await connect(MONGODB_URI);
    logger.info(`MongoDB is connected: ${db.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
