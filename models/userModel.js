const mongoose = require("mongoose");
const Movie = require("../models/movieModel");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])(?=.*[a-zA-Z]).{8,}$/.test(
          value
        );
      },
      message:
        "Password must be 8+ characters with at least one symbol.",
    },
  },
  type: {
    type: String,
    required: true,
    trim: true,
    default: "user",
    enum: ["admin", "user"],
  },
  favouritesListes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Movie,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
