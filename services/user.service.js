const User = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const { compare } = require('./utils');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { ERRORS } = require('../constants');
const createOne = async ({ name, email, password, salt }) => {
  const newUser = await User.create({ name, email, password, salt });
  await newUser.save();
  return newUser;
};

const readOne = async (name) => {
  return await User.findOne({ name });
};

const readAll = async () => {
  return await User.find({});
};

const updateOne = async (name, payload) => {
  const updatedUser = await User.findOneAndUpdate(
    { name },
    { ...payload },
    { new: true }
  );
  return updatedUser;
};

const deleteOne = async (name) => {
  const userToDelete = await User.findOne({ name });
  const deleteCount = await userToDelete.deleteOne();
  return deleteCount;
};

const isUserExists = async (name, email) => {
  return (
    (await User.findOne({ name })) !== null ||
    (await User.findOne({ email })) !== null
  );
};

const generateTokens = async (name, password) => {
  const user = await User.findOne({ name });
  if (!user) {
    throw new Error(ERRORS.USER_NOT_FOUND);
  }
  console.log('user', user);
  console.log('password', password);
  const isPasswordValid = await compare(
    user.password,
    user.salt,
    password,
    process.env.PEPPER_RANGE
  );
  if (!isPasswordValid) {
    throw new Error(ERRORS.WRONG_EMAIL_OR_PASSSWORD);
  }
  const accessToken = jwt.sign({ name: user.name }, process.env.TOKEN_SECRET, {
    expiresIn: '20m',
  });
  const refreshToken = jwt.sign({ name: user.name }, process.env.TOKEN_SECRET);
  return { accessToken, refreshToken };
};

module.exports = {
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
  isUserExists,
  generateTokens,
};
