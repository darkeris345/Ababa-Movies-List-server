const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

const { registerUser, loginUser, updateUser, userFavouriteList, deleteMovie } =
  userController;

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter
  .route("/:_id")
  .patch(updateUser)
  .get(userFavouriteList);
userRouter.route("/:_id/:movieId").patch(deleteMovie);

module.exports = userRouter;
