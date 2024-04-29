const userService = require("../services/user.service");

const {
  isValidEmailSyntax,
  isValidPassword,
  composite,
  compare,
  getRandString,
  getPublicUserData,
  respondWithError,
  respondWithStatus,
} = require("../services/utils");

const bcrypt = require("bcrypt");

const { SERCURITY, ERRORS, CRUD_OPS } = require("../constants");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!isValidEmailSyntax(email)) {
      return respondWithError(res, ERRORS.INVALID_EMAIL_ADDRESS);
    }
    if (!isValidPassword(password)) {
      return respondWithError(res, ERRORS.INVALID_PASSWORD);
    }
    if (await userService.isExistingUser(name)) {
      return respondWithError(res, ERRORS.NAME_OR_EMAIL_ERROR);
    }

    const pepper = parseInt(Math.random() * SERCURITY.PEPPER_RANGE);
    const userSalt = await bcrypt.hash(getRandString(), SERCURITY.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(
      composite(password, userSalt, pepper),
      SERCURITY.SALT_ROUNDS
    );
    if (hashedPassword === null) {
      return respondWithError(res, ERRORS.INTERNAL_ERROR);
    }

    const newUser = await userService.createOne({
      name,
      email,
      password: hashedPassword,
      salt: userSalt,
    });
    if (!newUser) {
      return respondWithError(res, ERRORS.INTERNAL_ERROR);
    }
    return respondWithStatus(res, CRUD_OPS.CREATED, getPublicUserData(newUser));
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await userService.readOne(name);
    if (!user) {
      return respondWithError(res, ERRORS.NAME_OR_EMAIL_ERROR);
    }
    const authenticated = await compare(
      user.password,
      user.salt,
      password,
      SERCURITY.PEPPER_RANGE
    );
    if (!authenticated) {
      return respondWithError(res, ERRORS.WRONG_EMAIL_OR_PASSSWORD);
    }
    return respondWithStatus(res, CRUD_OPS.READ_ONE, getPublicUserData(user));
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, payload } = req.body;
    const updatedUser = await userService.updateOne(name, payload);
    return respondWithStatus(res, CRUD_OPS.UPDATED, updatedUser);
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const getAllUsers = async (req, res) => {
  try {
    await userService.readAll();
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { name } = req.body;
    const dbRes = await userService.deleteOne(name);
    res.send({ msg: `Removed user ${name}` });
  } catch (err) {
    return respondWithError(res, ERRORS.INTERNAL_ERROR);
  }
};

module.exports = { register, login, getAllUsers, updateUser, deleteUser };
