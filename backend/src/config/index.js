const activeEnv = process.env.NODE_ENV || "development";
const envFile = `./environment.${activeEnv}`;
const env = require(envFile);

const config = {
    env: env.ENV,
    PORT: env.PORT,
    JWT_TOKEN_SECRET: env.JWT_TOKEN_SECRET
};

module.exports = { ...config };