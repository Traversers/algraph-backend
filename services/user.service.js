const User = require("../schemas/user.schema");

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
  const updatedUser = await User.findOneAndUpdate({ name }, { payload });
  return updatedUser;
};

const deleteOne = async (name) => {
  const userToDelete = await User.findOne({ name });
  const deleteCount = await userToDelete.deleteOne();
  return deleteCount;
};

const isExistingUser = async (name) => {
  return (await User.findOne({ name })) !== null;
};

module.exports = {
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
  isExistingUser,
};