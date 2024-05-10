const { COLORS, ERRORS } = require("../constants");

const BFS = (graph, srcId = "1") => {
  initializeVertices(graph);
  const source = graph.vertices.find((vert) => vert.id == srcId);
  source.color = COLORS.GREY;
  source.distance = 0;
  const steps = [structuredClone(graph)];
  const Q = [source];
  while (Q.length) {
    const currentVertex = Q.shift();
    const neighbours = findNeighbours(graph, currentVertex.id);
    neighbours.forEach((adjacentVertx) => {
      if (adjacentVertx.color == COLORS.WHITE) {
        adjacentVertx.color = COLORS.GREY;
        adjacentVertx.distance = currentVertex.distance + 1;
        adjacentVertx.PI = currentVertex.id;
        Q.push(adjacentVertx);
        steps.push(structuredClone(graph));
      }
    });
    currentVertex.color = COLORS.BLACK;
    steps.push(structuredClone(graph));
  }
  return steps;
};

const findNeighbours = (graph, vertId) => {
  const neighbours_ids = graph.edges
    .filter((edge) => edge.src == vertId)
    .map((edge) => edge.dest);
  return neighbours_ids.map((id) =>
    graph.vertices.find((vert) => vert.id == id)
  );
};

const DFS = (graph) => {
  if (!graph.vertices) throw new Error(ERRORS.EMPTY_GRAPH);
  initializeVertices(graph);
  let time = 0;
  for (let i = 0; i < graph.vertices.length; i++) {
    const u = graph.vertices[i];
    if (u.color == COLORS.WHITE) DFSvisit(graph, u, time);
  }
};

const DFSvisit = (graph, src, time) => {
  const stack = [src];
  while (stack.length > 0) {
    const u = stack.pop();
    if (u.color == COLORS.WHITE) {
      u.color = COLORS.GREY;
      time++;
      u.startTime = time;

      const uNeighbours = findNeighbours(graph, u);
      const unvisitedNeighbours = uNeighbours.filter(
        (n) => n.color == COLORS.WHITE
      );
      unvisitedNeighbours.forEach((v) => {
        v.PI = u.id;
        stack.push(v);
      });

      u.color = COLORS.BLACK;
      time++;
      u.finishTime = time;
    }
  }
};

const initializeVertices = (graph) => {
  graph.vertices.forEach((vert) => {
    vert.color = COLORS.WHITE;
    vert.PI = null;
    delete vert._id;
  });
};

const algorithms = { BFS };
module.exports = algorithms;
