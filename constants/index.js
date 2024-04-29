const PATH_AVATARS = "/public/avatars";
const AVATAR_GUEST = "guest";

const DEFAULT_USER = "system";

const SALT_ROUNDS = 12;
const PEPPER_RANGE = 1000;

const INVALID_EMAIL_ADDRESS = "Invalid Email Address!";
const INVALID_PASSWORD = "Invalid Password!";
const NAME_OR_EMAIL_TAKEN = "Invalid Name!";
const INTERNAL_SERVER_ERROR = "Internal Server Error";
const WRONG_PASSWORD = "Wrong Password!";

const ERRORS = {
  GRAPH_NOT_FOUND: "Graph not found!",
  INVALID_GRAPH: "Invalid graph format!",
  INTERNAL_ERROR: "Internal error occurred",
};

const ERROR_CODES_MAP = new Map([
  [ERRORS.GRAPH_NOT_FOUND, 404],
  [ERRORS.INVALID_GRAPH, 400],
  [ERRORS.INTERNAL_ERROR, 500],
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
  PATH_AVATARS,
  AVATAR_GUEST,
  SALT_ROUNDS,
  PEPPER_RANGE,
  INTERNAL_SERVER_ERROR,
  INVALID_EMAIL_ADDRESS,
  INVALID_PASSWORD,
  NAME_OR_EMAIL_TAKEN,
  WRONG_PASSWORD,
  DEFAULT_USER,
  ERROR_CODES_MAP,
  ERRORS,
  CRUD_OPS,
  SUCCESS_CODES_MAP,
  GRAPH_FIELDS,
};
