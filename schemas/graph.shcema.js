const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Edge = require("./edge.schema");

const Graph = new Schema({
  adjacencyLists: {
    // type: [[Edge]],
    type: [[]],
    default: [],
  },
  added: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Graph", Graph);
