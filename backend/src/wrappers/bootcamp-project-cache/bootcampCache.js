const redis = require('redis');
const config = require('../../config/index');

const redisClient = redis.createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT,
  },
});

redisClient.connect();
const BootcampProjectCache = {
  getCacheByKey: async (key) => {
    const redisData = await redisClient.get(key);
    return redisData;
  },
};
module.exports = { BootcampProjectCache, redisClient };
