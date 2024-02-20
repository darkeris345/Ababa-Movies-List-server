const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

const { registerUser, loginUser } = userController;

userRouter.route('/register').post(registerUser);
userRouter.route('/login').post(loginUser);

module.exports = userRouter;