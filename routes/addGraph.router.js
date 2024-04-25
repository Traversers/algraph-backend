const addGraphRouter = require("express").Router();
const edgeSchema = require("../schemas/edge.schema");
const Graph = require("../schemas/graph.shcema");

addGraphRouter.post("/", async (req, res) => {
  const newGraph = await Graph.create({ ...req.body });
  await newGraph.save();
  res.send(newGraph);
});

module.exports = addGraphRouter;
