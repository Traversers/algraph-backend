const { COLORS } = require("../constants");

const BFS = (DBgraph, srcId = "1") => {
  const graph = structuredClone(DBgraph);
  graph.vertices.forEach((vert) => (vert.color = COLORS.WHITE));
  const s = graph.vertices.find((vert) => vert.id == srcId);
  s.color = COLORS.GREY;
  s.distance = 0;
  const steps = [structuredClone(graph.vertices)];
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
        steps.push(structuredClone(graph.vertices));
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

const algorithms = { BFS };
module.exports = algorithms;
