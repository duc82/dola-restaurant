import { connect } from "mongoose";
import logger from "@/utils/logger.util";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  logger.error("Please provide MONGODB_URI in .env");
  process.exit(1);
}

const connectDB = async () => {
  try {
    await connect(MONGODB_URI);
    logger.info("MongoDB connected successfully!");
  } catch (error) {
    logger.error(`MongoDB connection failed: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDB;
