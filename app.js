const express = require("express");
const movieRouter = require("./route/movieRouter");
const userRouter = require("./route/userRouter");
const cors = require("cors");

// Create server
const app = express();
app.use(cors());

app.use(express.json());

app.use("/movies", movieRouter);
app.use("/users", userRouter);

module.exports = app;
