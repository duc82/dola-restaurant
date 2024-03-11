const jwt = require("jsonwebtoken");
const util = require("util");
require("dotenv").config();

const secretKeyJwt = process.env.SECRET_KEY_JWT;

const sign = util.promisify(jwt.sign);
const verify = util.promisify(jwt.verify);

const generateJwtToken = async (payload, options) => {
  const token = await sign(payload, secretKeyJwt, options);
  return token;
};

const verifyJwtToken = async (token) => {
  const { iat, exp, ...payload } = await verify(token, secretKeyJwt);
  return payload;
};

module.exports = { verifyJwtToken, generateJwtToken };
