const { createClient } = require("redis");

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  throw new Error("Please provider REDIS_URL in env");
}

const client = createClient({
  url: REDIS_URL,
});

module.exports = client;
