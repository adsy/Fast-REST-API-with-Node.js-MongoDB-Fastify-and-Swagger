// External Dependencies - boom provides handling for http errors
const boom = require("boom");

const Location = require("../models/Location");

exports.getLocations = async (req, reply) => {
  try {
    const locations = Location.find();
    return locations;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.getSingleLocation = async (req, reply) => {
  try {
    // get the id from the parameters
    const id = req.params === undefined ? req.id : req.params.id;
    const location = Location.findById(id);
    return location;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.addLocation = async (req, reply) => {
  try {
    console.log("trying here");
    // grabs the details of location in the request body
    const location = new Location(req.body);
    // saves new location to mongo DB
    return location.save();
  } catch (e) {
    console.log(e);
  }
};

exports.updateLocation = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    // grab updated location from body of request
    const updatedLoc = req.body === undefined ? req : req.body;
    // desctructure the body to get a new object
    const { ...updateData } = updatedLoc;
    const update = await Location.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    return update;
  } catch (e) {
    throw boom.boomify(e);
  }
};

exports.deleteLocation = async (req, reply) => {
  try {
    const id = req.params === undefined ? req.id : req.params.id;
    const deleted = await Location.findByIdAndRemove(id);
    return deleted;
  } catch (e) {
    throw boom.boomify(e);
  }
};
