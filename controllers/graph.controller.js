const graphDbService = require("../services/graph.service");
const {
  ERROR_GRAPH_NOT_FOUND,
  ERROR_INVALID_GRAPH,
  INTERNAL_ERROR,
} = require("../constants");
const { isValidGraph } = require("../services/utils");

const publishGraph = async (req, res) => {
  try {
    const { adjacencyLists, userId } = req.body;
    if (!isValidGraph(adjacencyLists)) {
      res.send({ error: ERROR_INVALID_GRAPH });
      return;
    }
    const newGraph = await graphDbService.DbCreateGraph({
      adjacencyLists,
      userId,
    });
    return res.send(newGraph);
  } catch (err) {
    console.log(err);
    res.send({ error: INTERNAL_ERROR });
  }
};

const getGraphById = async (req, res) => {
  try {
    const { id } = req.body;
    const tryGetGraph = await graphDbService.DbReadGraph(id);
    if (tryGetGraph) {
      res.send(tryGetGraph);
      return;
    } else {
      return res.send({ error: ERROR_GRAPH_NOT_FOUND });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: INTERNAL_ERROR });
  }
};

const getAllGraphs = async (req, res) => {
  try {
    return res.send(await graphDbService.DbReadAll());
  } catch (err) {
    console.log(err);
    res.send({ error: INTERNAL_ERROR });
  }
};

const updateGraph = async (req, res) => {
  try {
    const { id, adjacencyLists } = req.body;
    if (!isValidGraph(adjacencyLists)) {
      res.send({ error: ERROR_INVALID_GRAPH });
      return;
    }
    const updatedGraph = await graphDbService.DbUpdateGraph(id, adjacencyLists);
    return res.send(updatedGraph);
  } catch (err) {
    console.log(err);
    res.send({ error: INTERNAL_ERROR });
  }
};

const deleteGraph = async (req, res) => {
  try {
    const { id } = req.body;
    await graphDbService.DbDeleteGraph(id);
    return res.send({});
  } catch (err) {
    console.log(err);
    res.send({ error: INTERNAL_ERROR });
  }
};

module.exports = {
  publishGraph,
  getGraphById,
  getAllGraphs,
  updateGraph,
  deleteGraph,
};
