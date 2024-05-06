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
      throw new Error(HttpStatusCode.BadRequest);
    }

    if (!isValidEmail(email)) {
      throw new Error(HttpStatusCode.BadRequest);
    }
    if (!isValidPassword(password)) {
      throw new Error(HttpStatusCode.BadRequest);
    }

    const pepper = parseInt(Math.random() * SERCURITY.PEPPER_RANGE);
    const userSalt = await bcrypt.genSalt(SERCURITY.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(
      composite(password, userSalt, pepper),
      SERCURITY.SALT_ROUNDS
    );
    if (!hashedPassword) {
      throw new Error(HttpStatusCode.InternalServerError);
    }

    const newUser = await userService.createOne({
      name,
      email,
      password: hashedPassword,
      salt: userSalt,
    });
    if (!newUser) {
      throw new Error(ERRORS.INTERNAL_ERROR);
    }
    return respondWithStatus(res, CRUD_OPS.CREATED, getPublicUserData(newUser));
  } catch (err) {
    console.log('error creating user', err.message);
    throw new Error(`failed to create user: ${err.message}`);
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await userService.readOne(name);
    if (!user) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .send(ERRORS.WRONG_EMAIL_OR_PASSSWORD);
    }
    const authenticated = await compare(
      user.password,
      user.salt,
      password,
      SERCURITY.PEPPER_RANGE
    );
    if (!authenticated) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .send(ERRORS.WRONG_EMAIL_OR_PASSSWORD);
    }
    const tokens = await userService.generateTokens(user);
    if (!tokens) {
      res
        .status(HttpStatusCode.InternalServerError)
        .send('failed to generate tokens');
    }
    return res.status(HttpStatusCode.Ok).send(tokens);
  } catch (error) {
    console.log('error logging in', error.message);
    if (error.response?.status === HttpStatusCode.Unauthorized) {
      return res
        .status(HttpStatusCode.Unauthorized)
        .send(ERRORS.WRONG_EMAIL_OR_PASSSWORD);
    }
    return res
      .status(HttpStatusCode.InternalServerError)
      .send(`failed to login: ${error.message}`);
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
