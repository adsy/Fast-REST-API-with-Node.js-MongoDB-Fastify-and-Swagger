const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  suburb: String,
  city: String,
  state: String,
  country: String,
});

module.exports = mongoose.model("Location", locationSchema);
