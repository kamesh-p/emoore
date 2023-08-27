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
      // required: true,
    },
    genre: {
      type: [],
      // required: true,
    },
    education: {
      type: String,
      // required: true,
    },
    Type: {
      type: String,
    },
    RentedSub: {
      type: Boolean,
    },
  },

  {
    collection: "users",
  }
);

const User = mongoose.model("users", userSchema);

module.exports = User;
