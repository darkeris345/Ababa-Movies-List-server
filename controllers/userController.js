const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.JWT_SECRET;

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(404).json({
        message: "Username already exists. Please choose a different username",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, username, _id: user._id });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Post movie to user
exports.updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { favouriteListes } = req.body;

    const user = await User.findByIdAndUpdate(
      _id,
      { $addToSet: { favouritesListes: favouriteListes } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(422)
        .json({ message: "Validation failed", errors: error.errors });
    }
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Delete movie from user
exports.deleteMovie = async (req, res) => {
  try {
    const { _id, movieId } = req.params;
    const user = await User.findByIdAndUpdate(
      _id,
      { $pull: { favouritesListes: movieId } },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get user favourite list
exports.userFavouriteList = async (req, res) => {
  try {
    const { _id } = req.params;
    const { Title } = req.query;

    if (Title && Title.length >= 3) {
      const user = await User.findById(_id).populate("favouritesListes");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const filteredFavourites = user.favouritesListes.filter((item) => {
        return item.Title.toLowerCase().includes(Title.toLowerCase());
      });

      res.status(200).json(filteredFavourites);
    } else {
      const user = await User.findById(_id).populate("favouritesListes");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user.favouritesListes);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
