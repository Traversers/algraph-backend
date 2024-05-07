const { HttpStatusCode } = require('axios');
const userService = require('../services/user.service');

const {
  isValidEmail,
  isValidPassword,
  composite,
  compare,
  getPublicUserData,
  respondWithError,
  respondWithStatus,
} = require('../services/utils');

const bcrypt = require('bcrypt');

const { SERCURITY, ERRORS, CRUD_OPS } = require('../constants');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (await userService.isUserExists(name, email)) {
      return res.status(HttpStatusCode.Conflict).send('user already exists');
    }
    const userSalt = await bcrypt.genSalt(SERCURITY.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, userSalt);
    if (!hashedPassword) {
      throw new Error(HttpStatusCode.InternalServerError);
    }
    const newUser = await userService.createOne({
      name,
      email,
      password: hashedPassword,
    });
    if (!newUser) {
      return res.status(HttpStatusCode.InternalServerError).send();
    }
    return res.status(HttpStatusCode.Created).send(newUser);
  } catch (err) {
    console.log('error registering', err);
    if (err.message === HttpStatusCode.BadRequest) {
      return res
        .status(HttpStatusCode.BadRequest)
        .send(ERRORS.NAME_OR_EMAIL_ERROR);
    }
    if (err.message === HttpStatusCode.InternalServerError) {
      return res
        .status(HttpStatusCode.InternalServerError)
        .send(ERRORS.INTERNAL_ERROR);
    }
    return res.status(HttpStatusCode.InternalServerError).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const tokens = await userService.generateTokens(name, password);
    return res.status(HttpStatusCode.Ok).json(tokens);
  } catch (err) {
    if (err.message === ERRORS.WRONG_EMAIL_OR_PASSSWORD) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .send(ERRORS.WRONG_EMAIL_OR_PASSSWORD);
    }
    if (err.message === ERRORS.INVALID_PASSWORD) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .send(ERRORS.INVALID_PASSWORD);
    }
    if (err.message === ERRORS.USER_NOT_FOUND) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .send(ERRORS.USER_NOT_FOUND);
    }
    return res.status(HttpStatusCode.InternalServerError).send(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, payload } = req.body;
    const updatedUser = await userService.updateOne(name, payload);
    return respondWithStatus(res, CRUD_OPS.UPDATED, updatedUser);
  } catch (err) {
    return respondWithError(res, err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    await userService.readAll();
  } catch (err) {
    return respondWithError(res, err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { name } = req.body;
    const dbRes = await userService.deleteOne(name);
    res.send({ msg: `Removed user ${name}` });
  } catch (err) {
    return respondWithError(res, err.message);
  }
};

module.exports = { register, login, getAllUsers, updateUser, deleteUser };
