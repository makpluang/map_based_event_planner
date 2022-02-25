const { Mongo_URI, DistanceMatrixKey, REDIS_HOST } = require("./environment.development");

const activeEnv = process.env.NODE_ENV || "development";
const envFile = `./environment.${activeEnv}`;
const env = require(envFile);

const config = {
    env: env.ENV,
    PORT: process.env.PORT || 3000,
    JWT_TOKEN_SECRET: env.JWT_TOKEN_SECRET,
    Mongo_URI:env.Mongo_URI,
    DistanceMatrixKey:env.DistanceMatrixKey,
    REDIS_HOST:process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT:process.env.REDIS_PORT || 6379
};

module.exports = { ...config };