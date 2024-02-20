const express = require("express");

const movieController = require("../controllers/movieController");

const movieRouter = express.Router();

const { getMovies, getMovie, addMovie, updateMovie, deleteMovie } =
  movieController;

movieRouter.route("/").get(getMovies).post(addMovie);
movieRouter
  .route("/:_id")
  .get(getMovie)
  .put(updateMovie)
  .delete(deleteMovie);

module.exports = movieRouter;