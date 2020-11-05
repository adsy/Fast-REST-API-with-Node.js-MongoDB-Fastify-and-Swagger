const { lengthRequired } = require("boom");
const boom = require("boom");

const Restaurant = require("../models/Restaurants");

exports.getSingleRestaurant = async (req) => {
  try {
    const id = req.params.id === undefined ? req.params : req.params.id;
    const restaurant = await Restaurant.findById(id);
    return restaurant;
  } catch (e) {
    boom.boomify(e);
  }
};

exports.getAllRestaurants = async (req) => {
  try {
    const restaurants = await Restaurant.find();
    return restaurants;
  } catch (e) {
    boom.boomify(e);
  }
};

exports.getLocationsRestaurants = async (req) => {
  try {
    const id = req.params.id === undefined ? req.params : req.params.id;
    const restaurants = await Restaurant.find({ suburb: id });
    return restaurants;
  } catch (e) {
    boom.boomify(e);
  }
};

exports.addRestaurants = async (req) => {
  try {
    return new Restaurant(req.body).save();
  } catch (e) {
    boom.boomify(e);
  }
};

exports.updateRestaurant = async (req) => {
  try {
    const id = req.params.id === undefined ? req.id : req.params.id;
    const updatedData = req.body === undefined ? req : req.body;
    const { ...updatedRestaurant } = updatedData;
    const update = Restaurant.findByIdAndUpdate(id, updatedRestaurant, {
      new: true,
    });
    return update;
  } catch (e) {
    boom.boomify(e);
  }
};

exports.deleteRestaurant = async (req) => {
  try {
    const id = req.params.id === undefined ? req.id : req.params.id;
    const deletedRestaurant = Restaurant.findOneAndDelete(id);
    return deletedRestaurant;
  } catch (e) {
    boom.boomify(e);
  }
};
