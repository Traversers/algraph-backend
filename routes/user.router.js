const userRouter = require("express").Router();
const userController = require("../controllers/user.controller");

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.put("/update", userController.updateUser);
userRouter.delete("/delete", userController.deleteUser);
userRouter.get("all", userController.getAllUsers);

module.exports = userRouter;
