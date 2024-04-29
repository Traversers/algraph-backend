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

const GRAPH_NOT_FOUND = "Graph not found!";
const INVALID_GRAPH = "Invalid graph format!";
const INTERNAL_ERROR = "Internal error occurred";

const ERRORS = { GRAPH_NOT_FOUND, INVALID_GRAPH, INTERNAL_ERROR };

const ERROR_CODES_MAP = new Map([
  [GRAPH_NOT_FOUND, 404],
  [INVALID_GRAPH, 400],
  [INTERNAL_ERROR, 500],
]);

const CREATED = "Create";
const READ_ONE = "Read One";
const READ_MANY = "Read Many";
const UPDATED = "Update";
const DELETED = "Delete";

const CRUD_OPS = {
  CREATED,
  READ_ONE,
  READ_MANY,
  UPDATED,
  DELETED,
};

const SUCCESS_CODES_MAP = new Map([
  [CREATED, 201],
  [READ_ONE, 200],
  [READ_MANY, 200],
  [UPDATED, 200],
  [DELETED, 204],
]);

const WEIGHT = "weight";
const DESTINATION = "destination";

const GRAPH_FIELDS = { WEIGHT, DESTINATION };

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
