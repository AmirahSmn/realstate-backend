const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema(
  {
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
    remark: { type: String, trim: true, default: "" },
    closed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Site", SiteSchema);
