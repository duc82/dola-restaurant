import { NextFunction, Request, Response } from "express";
import CustomError from "@/utils/error.util";

function errorHandlerMiddleware(
  err: CustomError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // Unknown error
  return res.status(500).json({
    message: err.message,
  });
}

export default errorHandlerMiddleware;
