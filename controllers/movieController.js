const Movie = require("../models/movieModel");

// Get all movies

exports.getMovies = async (req, res) => {
  try {
    const page = +req.query._page || 1;
    const perPage = +req.query._per_page || 10;

    const totalCount = await Movie.countDocuments();

    const movies = await Movie.find({})
      .sort({ Title: 1 })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.header("x-total-count", totalCount.toString());
    res.status(200).json({ movies, totalCount });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single movie

exports.getMovie = async (req, res) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findById(_id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Add movie

exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({ movie });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update movie

exports.updateMovie = async (req, res) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete movie

exports.deleteMovie = async (req, res) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findByIdAndDelete(_id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
