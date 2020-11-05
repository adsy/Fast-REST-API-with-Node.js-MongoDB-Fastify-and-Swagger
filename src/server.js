// Require fastify framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Require external module for mongoose
const mongoose = require("mongoose");

// Connect to the DB after starting server
mongoose
  .connect("mongodb://localhost/locations")
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((err) => console.log(err));

module.exports = fastify;
