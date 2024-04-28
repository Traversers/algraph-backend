const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DEFAULT_USER } = require("../constants");

const Graph = new Schema({
  adjacencyLists: {
    type: [[]],
    default: [],
  },
  added: {
    type: Date,
    default: () => Date.now(),
  },
  modified: {
    type: Date,
    default: () => Date.now(),
  },
  userId: {
    type: String,
    default: DEFAULT_USER,
  },
  viewsCount: {
    type: Number,
    default: 1,
  },
});

module.exports = mongoose.model("Graph", Graph);
