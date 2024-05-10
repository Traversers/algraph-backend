const addGraphRouter = require('express').Router();
const graphController = require('../controllers/graph.controller');
const { default: authMiddleware } = require('../middlewares/auth.middleware');

addGraphRouter.post('/publish', authMiddleware, graphController.publishGraph);
addGraphRouter.get('/all', authMiddleware, graphController.getAllGraphs);
addGraphRouter.post('/getGraph', authMiddleware, graphController.getGraphById);
addGraphRouter.put('/update', authMiddleware, graphController.updateGraph);
addGraphRouter.delete('/delete', authMiddleware, graphController.deleteGraph);

module.exports = addGraphRouter;
