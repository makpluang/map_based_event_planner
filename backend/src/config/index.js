const { Mongo_URI, DistanceMatrixKey, REDIS_HOST } = require("./environment.development");

const activeEnv = process.env.NODE_ENV || "development";
const envFile = `./environment.${activeEnv}`;
const env = require(envFile);

const config = {
    env: env.ENV,
    PORT: env.PORT,
    JWT_TOKEN_SECRET: env.JWT_TOKEN_SECRET,
    Mongo_URI:env.Mongo_URI,
    DistanceMatrixKey:env.DistanceMatrixKey,
    REDIS_HOST:env.REDIS_HOST,
    REDIs_PORT:env.REDIS_PORT
};

module.exports = { ...config };