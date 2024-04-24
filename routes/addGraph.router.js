const addGraphRouter = require("express").Router();
const edgeSchema = require("../schemas/edge.schema");
const Graph = require("../schemas/graph.shcema");

addGraphRouter.post("/", async (req, res) => {
  //Expecting body to have one field: adjacencyLists
  const newGraph = await Graph.create({ ...req.body });
  await newGraph.save();
  res.send(newGraph);

  /* I wrote how to make an http request in order to POST a new GRAPH */

  //   const fakeGraph = [[{target:1,weight:3},{target:2,weight:33}],
  // [{target:2,weight:333}]];
  // const HEADERS = new Headers({
  //     "Content-Type": "application/json",
  //   });
  //   const httpres = await fetch("http://localhost:8000/graph",{
  //     method:"POST",
  //     headers: HEADERS,
  //     body:JSON.stringify({adjacencyLists:fakeGraph})
  //   }) ;
  //   const result = await httpres.json();
  //   console.log(result);
});

module.exports = addGraphRouter;
