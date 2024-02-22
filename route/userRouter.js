const express = require("express");
const userController = require("../controllers/userController");
const authUserController = require("../middlewares/authUser");

const userRouter = express.Router();

const { authUser } = authUserController;

const { registerUser, loginUser, updateUser, userFavouriteList, deleteMovie } =
  userController;

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter
  .route("/:_id")
  .patch(authUser, updateUser)
  .get(authUser, userFavouriteList);
userRouter.route("/:_id/:movieId").patch(authUser, deleteMovie);

module.exports = userRouter;
