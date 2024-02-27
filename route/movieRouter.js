const express = require("express");
const movieController = require("../controllers/movieController");
const authUserController = require("../middlewares/authUser");
const { idEndpoint, getMoviesEndpoint } = require("../route/routesEndpoint");

const movieRouter = express.Router();

const { authUser } = authUserController;

const { getMovies, getMovie, createMovie, deleteMovie, updateMovie } =
  movieController;

movieRouter
  .route(getMoviesEndpoint)
  .get(authUser, getMovies)
  .post(authUser, createMovie);
movieRouter
  .route(idEndpoint)
  .get(authUser, getMovie)
  .patch(authUser, updateMovie)
  .delete(authUser, deleteMovie);

module.exports = movieRouter;
