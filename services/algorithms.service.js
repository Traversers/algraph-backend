const { COLORS, ERRORS } = require("../constants");

const BFS = (graph, srcId = "1") => {
  initializeVertices(graph);
  const s = graph.vertices.find((vert) => vert.id == srcId);
  s.color = COLORS.GREY;
  s.distance = 0;
  const steps = [structuredClone(graph)];
  const Q = [s];
  while (Q.length) {
    const u = Q.shift();
    const neighbours = findNeighbours(graph, u.id);
    neighbours.forEach((n) => {
      if (n.color == COLORS.WHITE) {
        n.color = COLORS.GREY;
        n.distance = u.distance + 1;
        n.PI = u.id;
        Q.push(n);
        steps.push(structuredClone(graph));
      }
    });
    u.color = COLORS.BLACK;
  }
  return steps;
};

const findNeighbours = (graph, u) => {
  const neighbours_ids = graph.edges
    .filter((edge) => edge.src == u)
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
