const bcrypt = require("bcrypt");

const {
  ERROR_CODES_MAP,
  SUCCESS_CODES_MAP,
  GRAPH_FIELDS,
} = require("../constants");

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const isValidEmailSyntax = (email_address) => EMAIL_REGEX.test(email_address);

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

const getRandString = () => `${Math.random()}${Date.now()}`;

const validFields = [GRAPH_FIELDS.WEIGHT, GRAPH_FIELDS.DESTINATION];

const objIsEdge = (obj, vertexIndex) => {
  const fields = Object.keys(obj);
  if (fields.length != validFields.length) return false;
  for (let i = 0; i < fields.length; i++) {
    if (!validFields.includes(fields[i])) return false;
  }
  const condition1 = !fields.includes(GRAPH_FIELDS.WEIGHT);
  const condition2 = obj[DESTINATION] === null;
  const condition3 = obj[DESTINATION] == `${vertexIndex}`;

  if (condition1 || condition2 || condition3) return false;

  if (!fields.includes(WEIGHT) || isNaN(parseFloat(obj[WEIGHT]))) return false;

  return true;
};

const isValidNhoodList = (nList, verticesAmount, vertexIndex) => {
  if (!Array.isArray(nList) || nList.length >= verticesAmount) return false;

  return nList.every((n) => objIsEdge(n, vertexIndex));
};

const isValidGraph = (graph) => {
  if (!Array.isArray(graph)) return false;
  return graph.every((nList, i) => isValidNhoodList(nList, graph.length, i));
};

const respondWithStatus = (res, opType, payload) =>
  res.status(SUCCESS_CODES_MAP.get(opType)).send(payload);

const respondWithError = (res, errorMsg) =>
  res.status(ERROR_CODES_MAP.get(errorMsg)).send({ error: errorMsg });

module.exports = {
  isValidEmailSyntax,
  isValidPassword,
  composite,
  compare,
  getRandString,
  isValidGraph,
  respondWithError,
  respondWithStatus,
};
