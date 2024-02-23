const express = require("express");
const userController = require("../controllers/userController");
const authUserController = require("../middlewares/authUser");
const { registerEndpoint, loginEndpoint, idEndpoint, movieIdEndpoint } = require("../route/routesEndpoint");

const userRouter = express.Router();

const { authUser } = authUserController;

const { registerUser, loginUser, updateUser, userFavouriteList, deleteMovie } =
  userController;

userRouter.route(registerEndpoint).post(registerUser);
userRouter.route(loginEndpoint).post(loginUser);
userRouter
  .route(idEndpoint)
  .patch(authUser, updateUser)
  .get(authUser, userFavouriteList);
userRouter.route(movieIdEndpoint).patch(authUser, deleteMovie);

module.exports = userRouter;
