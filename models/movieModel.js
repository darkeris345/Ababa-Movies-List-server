const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Year: {
    type: String,
    required: true,
    trim: true,
  },
  Runtime: {
    type: Number,
    required: true,
    trim: true,
    valdiate: {
      validator: function (value) {
        return value > 40;
      },
      message: "Movie should be at least 40 minutes long",
    },
  },
  Genre: {
    type: String,
    required: true,
    trim: true,
  },
  Plot: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  Poster: {
    type: String,
    required: true,
    trim: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
