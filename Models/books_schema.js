const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    author: {
      type: String,
    },

    imagelink: {
      type: String,
    },

    title: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    classification: {
      type: String,
    },

    language: {
      type: String,
    },

    genre: {
      type: String,
    },
    Education: {
      type: String,
    },
    // Rating: {
    //   type: Number,
    // },
  },
  { collection: "books" }
);

module.exports = mongoose.model("books", bookSchema);
