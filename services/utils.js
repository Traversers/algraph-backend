const bcrypt = require("bcrypt");
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

const composite = (base, salt, pepper) => `${salt}${base}${pepper} `;

const compare = async (storedPassword, userSalt, input, RANGE) => {
  for (let i = 0; i < RANGE; i++) {
    let cmp_res = await bcrypt.compare(
      composite(input, userSalt, i),
      storedPassword
    );
    if (cmp_res) return true;
  }
  return false;
};

const getRandString = () => `${Math.random()}${Date.now()}`;

const WEIGHT = "weight";
const DESTINATION = "destination";
const validFields = [WEIGHT, DESTINATION];

const objIsEdge = (obj, vertexIndex) => {
  const fields = Object.keys(obj);
  if (fields.length != validFields.length) return false;
  for (let i = 0; i < fields.length; i++) {
    if (!validFields.includes(fields[i])) return false;
  }
  if (
    !fields.includes(DESTINATION) ||
    obj[DESTINATION] === null ||
    obj[DESTINATION] == `${vertexIndex}`
  )
    return false;
  if (!fields.includes(WEIGHT) || isNaN(parseFloat(obj[WEIGHT]))) return false;
  return true;
};

const isValidNhoodList = (nList, verticesAmount, vertexIndex) => {
  if (!Array.isArray(nList)) return false;
  const n = nList.length;
  if (n >= verticesAmount) return false;
  for (let i = 0; i < n; i++) {
    if (!objIsEdge(nList[i], vertexIndex)) return false;
  }
  return true;
};

const isValidGraph = (graph) => {
  if (!Array.isArray(graph)) return false;
  const verticesAmount = graph.length;
  for (let i = 0; i < verticesAmount; i++) {
    if (!isValidNhoodList(graph[i], verticesAmount, i)) return false;
  }
  return true;
};

module.exports = {
  isValidEmailSyntax,
  isValidPassword,
  composite,
  compare,
  getRandString,
  isValidGraph,
};
