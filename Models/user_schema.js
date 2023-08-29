const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,

      required: true,
    },
    language: {
      type: [],
    },
    genre: {
      type: [],
    },
    education: {
      type: String,
    },
    Type: {
      type: String,
    },
    RentedSub: {
      type: Boolean,
    },

    SellProduct: {
      type: Number,
    },
  },

  {
    collection: "users",
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
