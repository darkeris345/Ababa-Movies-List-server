const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require('dotenv').config();
const Movie = require("./models/movieModel");

const dbURL = process.env.DATABASE_URL;

async function main() {
    await mongoose.connect(dbURL);
    console.log("Database connected");
}
main().catch((err)=>console.log(err.message));

const movies = fs.readFileSync("./dev-data/moviesDB.movies.json", "utf-8");

const importData = async () => {
    try {
        await Movie.create(JSON.parse(movies));
        console.log("Data imported");
    } catch (err) {
        console.log(err.message);
    }
}

// importData();

const deleteData = async () => {
    try {
        await Movie.deleteMany();
        console.log("Data deleted");
    } catch (err) {
        console.log(err.message);
    }
}


if(process.argv[2] === "--import"){
    importData();
}else if(process.argv[2] === "--delete"){
    deleteData();
}