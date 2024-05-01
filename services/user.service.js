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

module.exports = {
  createOne,
  readOne,
  readAll,
  updateOne,
  deleteOne,
  isUserExists,
};
