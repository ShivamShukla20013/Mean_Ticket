const mongoose = require('mongoose');
const config = require("../config");
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("✅ MongoDB is connected!");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;