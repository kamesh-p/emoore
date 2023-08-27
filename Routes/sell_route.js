let mongoose = require("mongoose"),
  express = require("express"),
  sellRouter = express.Router();

// selling Model

let sellingSchema = require("../Models/sell_schema");

// // CREATE selling

sellRouter.route("/create-user").post((req, res, next) => {
  sellingSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
});

// READ sellings

sellRouter.route("/").get((req, res) => {
  sellingSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get Single selling

sellRouter.route("/get-selling/:id").get((req, res) => {
  sellingSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update selling

sellRouter.route("/update-selling/:id").put((req, res, next) => {
  sellingSchema.findByIdAndUpdate(
    req.params.id,

    {
      $set: req.body,
    },

    (error, data) => {
      if (error) {
        return next(error);

        console.log(error);
      } else {
        res.json(data);

        console.log("selling updated successfully !");
      }
    }
  );
});

// Delete selling

sellRouter.route("/delete-selling/:id").delete((req, res, next) => {
  sellingSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = sellRouter;
