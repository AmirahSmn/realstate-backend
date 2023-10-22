const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
  },
  size: {
    type: String,
  },
  buildingStatus: {
    type: String,
    trim: true,
  },
  sellingStatus: {
    type: String,
    trim: true,
  },
  bedroom: {
    type: Number,
  },
  bathroom: { type: Number },
  propertyImage: {
    url: { type: String, trim: true },
    id: {
      type: String,
      trim: true,
    },
  },
  floorPlans: [],
  description: { type: String },
  mapLocation: { type: String },
  siteName: { type: String },
  featured: { type: Boolean, default: false },
  featuredStatement: { type: String, trim: true, default: "" },
  propertyType: {
    type: String,
    trim: true,
  },
  siteId: {
    type: String,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
