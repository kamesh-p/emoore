const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    user: {
      type: {},
    },

    language: {
      type: String,

      required: true,
    },

    genre: {
      type: String,

      required: true,
    },

    education: {
      type: String,

      required: true,
    },

    format: {
      type: String,

      required: true,
    },
  },
  { collection: "genres" }
);

module.exports = mongoose.model("genres", genreSchema);
