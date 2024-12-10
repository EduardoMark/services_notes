const { Router } = require("express");
const userController = require("../controllers/userController");
const { validateUserPostBody, validateUserPutBody } = require("../middlewares/userValidator");
const validateJWT = require("../middlewares/validateJWT");
const validateId = require("../middlewares/validateId");

const userRouter = Router();

// Users
userRouter.get('/users/me', validateJWT, userController.getUserData);
userRouter.post('/users', validateUserPostBody, userController.creteUser);
userRouter.put('/users/me', validateJWT, validateUserPutBody, userController.updateUser);
userRouter.delete('/users/me', validateJWT, userController.deleteUser);

// Login
userRouter.post('/login', userController.login);

module.exports = userRouter;