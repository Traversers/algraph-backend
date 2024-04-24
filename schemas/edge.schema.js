const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Edge = new Schema({
  target: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Edge", Edge);
