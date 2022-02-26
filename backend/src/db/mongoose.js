const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.Mongo_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
