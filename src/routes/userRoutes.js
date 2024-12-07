const { Router } = require("express");
const userController = require("../controllers/userController");
const { validateUserBody } = require("../utils/userValidator");

const userRouter = Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.post('/users', validateUserBody, userController.creteUser);

module.exports = userRouter;