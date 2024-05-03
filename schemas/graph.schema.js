const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DEFAULT_USER } = require("../constants");

const Vertex = new Schema({
  id: {
    type: String,
    required: true,
  },
  location: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  color: {
    type: String,
    default: "fca311",
  },
  distance: {
    type: Number,
    default: Infinity,
  },
  PI: {
    type: Schema.Types.ObjectId,
    default: null,
  },
});

const Edge = new Schema({
  src: String,
  dest: String,
  weight: {
    type: Number,
    default: 1,
  },
  color: {
    type: String,
    default: "#BE3232",
  },
});

const Graph = new Schema({
  directed: {
    type: Boolean,
    default: true,
  },
  vertices: {
    type: [Vertex],
    default: [],
  },
  edges: {
    type: [Edge],
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
