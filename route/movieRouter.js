const express = require("express");
const movieController = require("../controllers/movieController");
const authUserController = require("../middlewares/authUser");

const movieRouter = express.Router();

const { authUser } = authUserController;

const { getMovies, getMovie, addMovie, updateMovie, deleteMovie } =
  movieController;

movieRouter.route("/").get(authUser, getMovies).post(authUser, addMovie);
movieRouter
  .route("/:_id")
  .get( getMovie)
  .put(authUser, updateMovie)
  .delete(authUser, deleteMovie);

module.exports = movieRouter;
