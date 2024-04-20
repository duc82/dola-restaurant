import CustomError from "@/utils/error.util";
import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const Body = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);
    if (error) {
      throw new CustomError({
        status: 400,
        message: error.message,
      });
    }

    req.body = value;

    next();
  };
};

const Params = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      throw new CustomError({
        status: 400,
        message: error.message,
      });
    }

    req.params = value;

    next();
  };
};

const Query = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.query);
    if (error) {
      throw new CustomError({
        status: 400,
        message: error.message,
      });
    }

    req.query = value;

    next();
  };
};

export { Body, Params, Query };
