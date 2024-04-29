const graphService = require("../services/graph.service");
const { ERRORS, CRUD_OPS } = require("../constants");

const {
  isValidGraph,
  respondWithError,
  respondWithStatus,
} = require("../services/utils");

const publishGraph = async (req, res) => {
  try {
    const { adjacencyLists, userId } = req.body;
    if (!isValidGraph(adjacencyLists)) {
      return respondWithError(res, ERRORS.INVALID_GRAPH);
    }
    const newGraph = await graphService.createGraph({
      adjacencyLists,
      userId,
    });
    return respondWithStatus(res, CRUD_OPS.CREATED, newGraph);
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const getGraphById = async (req, res) => {
  try {
    const { id } = req.body;
    const graph = await graphService.readGraph(id);
    if (graph) {
      return respondWithStatus(res, CRUD_OPS.READ_ONE, graph);
    } else {
      return respondWithError(res, ERRORS.GRAPH_NOT_FOUND);
    }
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const getAllGraphs = async (req, res) => {
  try {
    const graphsArray = await graphService.readAll();
    return respondWithStatus(res, CRUD_OPS.READ_MANY, graphsArray);
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const updateGraph = async (req, res) => {
  try {
    const { id, adjacencyLists } = req.body;
    if (!isValidGraph(adjacencyLists)) {
      return respondWithError(res, ERRORS.INVALID_GRAPH);
    }
    const updatedGraph = await graphService.updateGraph(id, adjacencyLists);
    return respondWithStatus(res, CRUD_OPS.UPDATED, updatedGraph);
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const deleteGraph = async (req, res) => {
  try {
    const { id } = req.body;
    const dbResponse = await graphService.deleteGraph(id);
    return respondWithStatus(res, CRUD_OPS.DELETED, dbResponse);
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

module.exports = {
  publishGraph,
  getGraphById,
  getAllGraphs,
  updateGraph,
  deleteGraph,
};
