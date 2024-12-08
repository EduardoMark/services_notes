const { Router } = require("express");
const userController = require("../controllers/userController");
const { validateUserPostBody, validateId, validateUserPutBody } = require("../middlewares/userValidator");

const userRouter = Router();

userRouter.get('/users', userController.getAllUsers);
userRouter.post('/users', validateUserPostBody, userController.creteUser);
userRouter.put('/users/:id', validateId, validateUserPutBody, userController.updateUser);
userRouter.delete('/users/:id', validateId, userController.deleteUser);

module.exports = userRouter;