const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { AVATAR_GUEST } = require('../constants');

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
  lastLogin: {
    type: Date,
    default: () => Date.now(),
  },
  graphs: {
    type: [String],
    default: [],
  },
  avatar: {
    type: String,
    default: AVATAR_GUEST,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', User);
