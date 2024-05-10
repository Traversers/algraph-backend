const { ERRORS } = require('../constants');
const { extractToken } = require('../services/user.service');
const { HttpStatusCode } = require('axios');

const authMiddleware = (req, res, next) => {
  const token = extractToken(req);
  if (token == null) {
    return res.status(HttpStatusCode.Unauthorized).send(ERRORS.UNAUTHORIZED);
    ks;
  }
  req.token = token;
  next();
};

export default authMiddleware;
