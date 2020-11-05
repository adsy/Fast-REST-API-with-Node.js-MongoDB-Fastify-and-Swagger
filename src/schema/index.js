const graphql = require("graphql");

// Destructure GraphQL functions
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

// import controllers
const locationController = require("../controllers/locationController");
const restaurantController = require("../controllers/restaurantController");

// Define Object Types
const locationType = new GraphQLObjectType({
  name: "Location",
  fields: () => ({
    _id: { type: GraphQLID },
    suburb: { type: GraphQLString },
    city: { type: GraphQLString },
    state: { type: GraphQLString },
    country: { type: GraphQLString },

    restaurants: {
      type: restaurantType,
      async resolve(parent, args) {
        return await restaurantController.getLocationsRestaurants({
          id: parent.suburb,
        });
      },
    },
  }),
});

const restaurantType = new GraphQLObjectType({
  name: "Restaurant",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    address: { type: GraphQLString },
    cuisines: { type: GraphQLString },
    suburb: { type: GraphQLString },
  }),
});

// Define Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    location: {
      type: locationType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await locationController.getSingleLocation(args);
      },
    },
    locations: {
      type: locationType,
      async resolve(parent, args) {
        return await locationController.getLocations();
      },
    },
    restaurant: {
      type: restaurantType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await restaurantController.getSingleRestaurant(args);
      },
    },
    restaurants: {
      type: restaurantType,
      async resolve(parent, args) {
        return await restaurantController.getAllRestaurants();
      },
    },
  },
});

// Define Mutations
const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    addLocation: {
      type: locationType,
      args: {
        suburb: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await locationController.addLocation(args);
        return data;
      },
    },
    editLocation: {
      type: locationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        suburb: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: GraphQLString },
        country: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await locationController.updateLocation(args);
        return data;
      },
    },
    deleteLocation: {
      type: locationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        const data = await locationController.deleteLocation(args);
        return data;
      },
    },
    addRestaurant: {
      type: restaurantType,
      args: {
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        cuisines: { type: GraphQLString },
        suburb: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await restaurantController.addRestaurants(args);
        return data;
      },
    },
    editRestaurant: {
      type: restaurantType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        cuisines: { type: GraphQLString },
        suburb: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const data = await restaurantController.updateRestaurant(args);
        return data;
      },
    },
    deleteRestaurant: {
      type: restaurantType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(args) {
        const data = await restaurantController.deleteRestaurant(args);
        return data;
      },
    },
  },
});

// Export the schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations,
});
