const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
    validate: {
      validator: function (value) {
        if (value.length < 8) {
          return false;
        }
        if (!/\d/.test(value)) {
          return false;
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          return false;
        }
        return true;
      },
      message:
        "Password should be at least 8 characters long and contain at least one number and one special character",
    },
  },
  favouriteMovies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
