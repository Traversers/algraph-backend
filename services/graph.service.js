const Graph = require("../schemas/graph.schema");
const { ERRORS } = require("../constants");
const algorithms = require("./algorithms.service");
const { clearData } = require("./utils");

const createGraph = async (graphData) => {
  const newGraph = await Graph.create(graphData);
  await newGraph.save();
  return newGraph;
};

const readGraph = async (graphId) => {
  const graph = await Graph.findById(graphId).lean();
  clearData(graph);
  return graph;
};

const runAlgo = async (graphId, algoName, src = "1") => {
  const graph = await readGraph(graphId);
  return algorithms.BFS(graph, src);
};

const readAll = async () => {
  return await Graph.find({});
};

const updateGraph = async (graphId, graphData) => {
  try {
    return await Graph.findByIdAndUpdate(
      graphId,
      { ...graphData },
      { new: true }
    );
  } catch (err) {
    return { error: ERRORS.INTERNAL_ERROR };
  }
};

const deleteGraph = async (graphId) => {
  const graphToDelete = await Graph.findById(graphId);
  const deleteCount = await graphToDelete.deleteOne();
  return deleteCount;
};

module.exports = {
  createGraph,
  readGraph,
  readAll,
  updateGraph,
  deleteGraph,
  runAlgo,
};
