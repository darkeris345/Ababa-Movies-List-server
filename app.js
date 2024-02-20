const express = require("express");
const movieRouter = require("./route/movieRouter");

const cors = require("cors");
// Create server
const app = express();
app.use(cors());

app.use(express.json());

app.use("/api/movies", movieRouter);

module.exports = app;
