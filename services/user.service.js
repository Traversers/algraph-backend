const User = require('../schemas/user.schema');
const jwt = require('jsonwebtoken');
const { compare } = require('./utils');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { ERRORS, TOKEN_EXPIRATION } = require('../constants');

const createOne = async ({ name, email, password }) => {
  const newUser = await User.create({ name, email, password });
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

const generateTokens = async (user) => {
  const accessToken = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRATION,
  });
  const random = Math.floor(Math.random() * 1000000).toString();
  const refreshToken = jwt.sign(
    { _id: user._id, random: random },
    process.env.TOKEN_SECRET,
    {}
  );
  if (user.tokens == null) {
    user.tokens = [];
  }
  user.tokens.push(refreshToken);
  try {
    await user.save();
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  } catch (err) {
    return null;
  }
};

const extractToken = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};

const getUserByToken = async (token) => {
  const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  return await User.findById(decoded._id);
};

module.exports = {
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
  isUserExists,
  generateTokens,
  extractToken,
  getUserByToken,
};
