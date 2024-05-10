const addGraphRouter = require("express").Router();
const graphController = require("../controllers/graph.controller");

addGraphRouter.post("/publish", graphController.publishGraph);
addGraphRouter.get("/all", graphController.getAllGraphs);
addGraphRouter.post("/getGraph", graphController.getGraphById);
addGraphRouter.put("/update", graphController.updateGraph);
addGraphRouter.delete("/delete", graphController.deleteGraph);
addGraphRouter.post("/runAlgo", graphController.runAlgorithm);

module.exports = addGraphRouter;
