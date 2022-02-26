const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema(
  {
    route:
    [
      Object,
    ],
    isassigned:
    {
      type: Boolean,
      default: false,

    },
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
);

const Path = mongoose.model('Path', pathSchema);

module.exports = Path;
