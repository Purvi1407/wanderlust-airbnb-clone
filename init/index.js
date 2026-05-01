
const mongoose = require("mongoose");
const data = require("./data");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(mongo_url);
}

const initDB = async () => {
  await Listing.deleteMany({});

  const initData = data.data.map((obj) => ({
    ...obj,
    owner: new mongoose.Types.ObjectId("686573a8ce5957a1322c7534")
  }));

  await Listing.insertMany(initData);
  console.log("New data inserted successfully");
};

main()
  .then(() => {
    console.log("Connected to DB");
    return initDB();
  })
  .catch(err => console.log(err));