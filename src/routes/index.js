const locationController = require("../controllers/locationController");
const restaurantController = require("../controllers/restaurantController");

const routes = [
  // Location Routes
  {
    method: "GET",
    url: "/api/locations",
    handler: locationController.getLocations,
  },
  {
    method: "GET",
    url: "/api/locations/:id",
    handler: restaurantController.getLocationsRestaurants,
  },
  {
    method: "POST",
    url: "/api/locations",
    handler: locationController.addLocation,
  },
  {
    method: "PUT",
    url: "/api/locations/:id",
    handler: locationController.updateLocation,
  },
  {
    method: "DELETE",
    url: "/api/locations/:id",
    handler: locationController.deleteLocation,
  },

  // Restaurant routes

  {
    method: "GET",
    url: "/api/restaurants",
    handler: restaurantController.getAllRestaurants,
  },
  {
    method: "GET",
    url: "/api/restaurants/:id",
    handler: restaurantController.getSingleRestaurant,
  },
  {
    method: "GET",
    url: "/api/locations/:id/restaurants",
    handler: restaurantController.getLocationsRestaurants,
  },
  {
    method: "POST",
    url: "/api/restaurants",
    handler: restaurantController.addRestaurants,
  },
  {
    method: "PUT",
    url: "/api/restaurants/:id",
    handler: restaurantController.updateRestaurant,
  },
  {
    method: "DELETE",
    url: "/api/restaurants/:id",
    handler: restaurantController.deleteRestaurant,
  },
];

module.exports = routes;
