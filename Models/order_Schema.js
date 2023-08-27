const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: {},
    },

    name: {
      type: String,

      required: true,
    },

    email: {
      type: String,
    },

    address: {
      type: String,

      required: true,
    },

    paymentType: {
      type: String,
    },

    items: {
      type: [],

      required: true,
    },

    totalPrice: {
      type: Number,

      required: true,
    },
    orderDate: {
      type: Date,
    },
  },
  { collection: "orders" }
);

module.exports = mongoose.model("orders", orderSchema);
