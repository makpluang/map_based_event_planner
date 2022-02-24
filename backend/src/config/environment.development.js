const env = {};

env.ENV = 'development';
env.PORT = 3000;
env.JWT_TOKEN_SECRET = 'thisismysecret'
env.Mongo_URI='mongodb+srv://kanhaiya:asqPXt5aaYPZO4Jx@cluster0.xzm7l.mongodb.net/new_hackathon?retryWrites=true&w=majority';
env.DistanceMatrixKey='AlphaDMA3YmNfpQ1qd73HPM7xVgPA48J2ADMgFV9';
env.REDIS_HOST='127.0.0.1';
env.REDIS_PORT=6379;


module.exports = env;
