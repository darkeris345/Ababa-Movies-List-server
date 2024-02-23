const express = require("express");
const movieController = require("../controllers/movieController");
const authUserController = require("../middlewares/authUser");
const { idEndpoint, getMoviesEndpoint  } = require("../route/routesEndpoint");

const movieRouter = express.Router();

const { authUser } = authUserController;

const { getMovies, getMovie, addMovie, updateMovie, deleteMovie } =
  movieController;

movieRouter.route(getMoviesEndpoint).get(authUser, getMovies).post(authUser, addMovie);
movieRouter
  .route(idEndpoint)
  .get(authUser, getMovie)
  .put(authUser, updateMovie)
  .delete(authUser, deleteMovie);

module.exports = movieRouter;
