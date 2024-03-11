const CustomError = require("../utils/error.util");

const Joi = require("joi");

class Validation {
  constructor() {}
  validateDto(schema) {
    return (req, _res, next) => {
      const { error } = Joi.object().keys(schema).validate(req.body);
      if (error) {
        throw new CustomError({ message: error.message, status: 400 });
      }
      next();
    };
  }

  validateQuery(schema) {
    return (req, _res, next) => {
      const { error } = Joi.object().keys(schema).validate(req.query);
      if (error) {
        throw new CustomError({ message: error.message, status: 400 });
      }
      next();
    };
  }

  validateParams(schema) {
    return (req, _res, next) => {
      const { error } = Joi.object().keys(schema).validate(req.params);
      if (error) {
        throw new CustomError({ message: error.message, status: 400 });
      }
      next();
    };
  }
}

module.exports = new Validation();
