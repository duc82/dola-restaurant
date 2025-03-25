const CustomError = require("../utils/error.util");

const Body = (schema) => {
  return (req, _res, next) => {
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

const Query = (schema) => {
  return (req, _res, next) => {
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

const Params = (schema) => {
  return (req, _res, next) => {
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

module.exports = {
  Body,
  Query,
  Params,
};
