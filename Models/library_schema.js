const mongoose = require("mongoose");

const libSchema = new mongoose.Schema(
  {
    users: {
      type: {},
    },

    days: {
      type: Number,
      required: true,
    },

    endDate: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    startDate: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
  { collection: "library" }
);

module.exports = mongoose.model("library", libSchema);
