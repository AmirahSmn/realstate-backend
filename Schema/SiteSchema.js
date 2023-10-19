const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  siteImage: {
    url: { type: String, trim: true },
    id: {
      type: String,
      trim: true,
    },
  },
  location: {
    type: String,
    trim: true,
  },
  featured: { type: Boolean, default: false },
  featuredStatement: { type: String, trim: true, default: "" },
  remark: { type: String, trim: true, default: "" },
});

module.exports = mongoose.model("Site", SiteSchema);
