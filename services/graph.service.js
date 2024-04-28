const Graph = require("../schemas/graph.schema");
const { INTERNAL_ERROR } = require("../constants");

const DbCreateGraph = async ({ adjacencyLists, userId }) => {
  const newGraph = await Graph.create({ adjacencyLists, userId });
  await newGraph.save();
  return newGraph;
};

const DbReadGraph = async (graphId) => {
  return await Graph.findById(graphId);
};

const DbReadAll = async () => {
  return await Graph.find({});
};

const DbUpdateGraph = async (graphId, updatedAdjacencyLists) => {
  try {
    const graphToUpdate = await Graph.findById(graphId);
    graphToUpdate.adjacencyLists = updatedAdjacencyLists;
    return await graphToUpdate.save();
  } catch (err) {
    console.log(err);
    return { error: INTERNAL_ERROR };
  }
};

const DbDeleteGraph = async (graphId) => {
  const graphToDelete = await Graph.findById(graphId);
  const deleteCount = await graphToDelete.deleteOne();
  return deleteCount;
};

module.exports = {
  DbCreateGraph,
  DbReadGraph,
  DbReadAll,
  DbUpdateGraph,
  DbDeleteGraph,
};
