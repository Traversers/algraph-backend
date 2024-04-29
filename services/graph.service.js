const Graph = require("../schemas/graph.schema");
const { ERRORS } = require("../constants");

const createGraph = async ({ adjacencyLists, userId }) => {
  const newGraph = await Graph.create({ adjacencyLists, userId });
  await newGraph.save();
  return newGraph;
};

const readGraph = async (graphId) => {
  return await Graph.findById(graphId);
};

const readAll = async () => {
  return await Graph.find({});
};

const updateGraph = async (graphId, updatedAdjacencyLists) => {
  try {
    const graphToUpdate = await Graph.findById(graphId);
    graphToUpdate.adjacencyLists = updatedAdjacencyLists;
    return await graphToUpdate.save();
  } catch (err) {
    console.log(err);
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
};
