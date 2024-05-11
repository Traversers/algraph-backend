const userRouter = require('express').Router();
const userController = require('../controllers/user.controller');
const { default: authMiddleware } = require('../middlewares/auth.middleware');

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.put('/update', authMiddleware, userController.updateUser);
userRouter.delete('/delete', authMiddleware, userController.deleteUser);
userRouter.get('/all', userController.getAllUsers);

module.exports = userRouter;
