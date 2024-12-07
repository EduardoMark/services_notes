const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

userRouter.get('/users', userController.getAllUsers);

module.exports = userRouter;