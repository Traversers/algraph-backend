const bcrypt = require("bcrypt");
const Graph = require("../schemas/graph.schema");

const { ERROR_CODES_MAP, SUCCESS_CODES_MAP, ERRORS } = require("../constants");

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmail = (email_address) => EMAIL_REGEX.test(email_address);

const isValidPassword = (password) =>
  password.length > 8 &&
  password.length < 20 &&
  /[A-Z]/.test(password) &&
  /[a-z]/.test(password) &&
  /\d/.test(password) &&
  /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

const composite = (base, salt, pepper) => `${salt}${base}${pepper}`;

const compare = async (storedPassword, userSalt, input, peperRange) => {
  for (let i = 0; i < peperRange; i++) {
    let comparisonResult = await bcrypt.compare(
      composite(input, userSalt, i),
      storedPassword
    );
    if (comparisonResult) return true;
  }
  return false;
};

const validateList = (items, getKey) => {
  const itemMap = new Map();
  for (const item of items) {
    const key = getKey(item);
    if (itemMap.has(key)) {
      throw new Error(`Duplicate item found: ${key}`);
    } else {
      itemMap.set(key, true);
    }
  }
};

const edgeKeyMapper = (edge) => `${edge.src}-${edge.dest}`;
const vertexKeyMapper = (vertex) => `${vertex.id}`;

const isValidGraph = async (graphData) => {
  try {
    if (!graphData.vertices) throw new Error(ERRORS.EMPTY_GRAPH);
    validateList(graphData.vertices, vertexKeyMapper);
    if (graphData.edges) validateList(graphData.edges, edgeKeyMapper);
    return await Graph.validate(graphData, { abortEarly: false });
  } catch (err) {
    throw new Error(err.message || ERRORS.INVALID_GRAPH);
  }
};

const getPublicUserData = (dbUser) => {
  return { name: dbUser.name, graphs: dbUser.graphs };
};

const respondWithStatus = (res, opType, payload) =>
  res.status(SUCCESS_CODES_MAP.get(opType)).send(payload);

const respondWithError = (res, errorMsg) => {
  if (!ERROR_CODES_MAP.get(errorMsg)) {
    return res
      .status(ERROR_CODES_MAP.get(ERRORS.INTERNAL_ERROR))
      .send({ error: ERRORS.INTERNAL_ERROR });
  }
  return res.status(ERROR_CODES_MAP.get(errorMsg)).send({ error: errorMsg });
};

module.exports = {
  isValidEmail,
  isValidPassword,
  composite,
  compare,
  isValidGraph,
  getPublicUserData,
  respondWithError,
  respondWithStatus,
};
