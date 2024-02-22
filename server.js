const app = require("./app");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
const dbURL = process.env.DATABASE_URL;

// Connect to DB
async function main() {
  await mongoose.connect(dbURL);
  console.log(`Database connected`);
}

main().catch((err) => console.log(err));

// START server
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
