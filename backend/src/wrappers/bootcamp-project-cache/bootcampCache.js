
const redis = require('redis');
const config = require('../../config/index');
const redisClient = redis.createClient({
  socket: {
    host: config.REDIS_HOST,
    port: config.REDIs_PORT
  }
});

redisClient.connect();
const BootcampProjectCache = {
  getCacheByKey: async(key) => {
    const redis_data = await redisClient.get(key);
    return redis_data;
  }
};
module.exports = { BootcampProjectCache, redisClient };