const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let saleSchema = new Schema(
  {
    user: {
      type: {},
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },
    author: {
      type: String,
    },
    classification: {
      type: String,
    },
    Education: {
      type: String,
    },
    Genre: {
      type: String,
    },
    language: {
      type: String,
    },

    price: {
      type: Number,
    },
  },

  {
    collection: "selling",
  }
);

module.exports = mongoose.model("selling", saleSchema);
