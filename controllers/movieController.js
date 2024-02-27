const Movie = require("../models/movieModel");

// Get all movies
exports.getMovies = async (req, res) => {
  try {
    // Filtering
    const { Title } = req.query;

    const filter = {};

    if (Title && Title.length >= 3) {
      filter.Title = { $regex: Title, $options: "i" };
    }

    const totalCount = await Movie.countDocuments(filter);

    // Pagination
    const page = +req.query._page || 1;
    const perPage = +req.query._per_page || 4;

    // Sorting
    const sort = {};
    if (req.query.sort) {
      const parts = req.query.sort.split(":");
      sort[parts[0]] = parts[1] === "asc" ? 1 : -1;
    } else {
      sort.Title = 1;
    }

    const movies = await Movie.find(filter)
      .sort(sort)
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


// Create movie
exports.createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Update movie
exports.updateMovie = async (req, res) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


// Delete movie
exports.deleteMovie = async (req, res) => {
  try {
    const { _id } = req.params;
    const movie = await Movie.findByIdAndDelete(_id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}