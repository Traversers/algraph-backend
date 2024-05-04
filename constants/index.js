const AVATAR_GUEST = "guest";

const DEFAULT_USER_NAME = "system";

const SERCURITY = {
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS) || 12,
  PEPPER_RANGE: parseInt(process.env.PEPPER_RANGE) || 1000,
};

const ERRORS = {
  GRAPH_NOT_FOUND: "Graph not found!",
  INVALID_GRAPH: "Invalid graph format!",
  INTERNAL_ERROR: "Internal error occurred",
  WRONG_EMAIL_OR_PASSSWORD: "Wrong Email or Password!",
  NAME_OR_EMAIL_ERROR: "Invalid Name or Email!",
  INVALID_PASSWORD: "Invalid Password!",
  INVALID_EMAIL_ADDRESS: "Invalid Email Address!",
  EMPTY_GRAPH: "Can't create empty graphs, at least 1 vertex is required.",
};

const ERROR_CODES_MAP = new Map([
  [ERRORS.GRAPH_NOT_FOUND, 404],
  [ERRORS.INVALID_GRAPH, 400],
  [ERRORS.EMPTY_GRAPH, 400],
  [ERRORS.INTERNAL_ERROR, 500],
  [ERRORS.WRONG_EMAIL_OR_PASSSWORD, 401],
  [ERRORS.NAME_OR_EMAIL_ERROR, 422],
  [ERRORS.INVALID_PASSWORD, 422],
  [ERRORS.INVALID_EMAIL_ADDRESS, 422],
]);

const CRUD_OPS = {
  CREATED: "Create",
  READ_ONE: "Read One",
  READ_MANY: "Read Many",
  UPDATED: "Update",
  DELETED: "Delete",
};

const SUCCESS_CODES_MAP = new Map([
  [CRUD_OPS.CREATED, 201],
  [CRUD_OPS.READ_ONE, 200],
  [CRUD_OPS.READ_MANY, 200],
  [CRUD_OPS.UPDATED, 200],
  [CRUD_OPS.DELETED, 204],
]);

const GRAPH_FIELDS = { WEIGHT: "weight", DESTINATION: "destination" };

module.exports = {
  AVATAR_GUEST,
  SERCURITY,
  DEFAULT_USER_NAME,
  ERROR_CODES_MAP,
  ERRORS,
  CRUD_OPS,
  SUCCESS_CODES_MAP,
  GRAPH_FIELDS,
};
