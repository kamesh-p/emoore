let mongoose = require("mongoose"),
  express = require("express"),
  libRouter = express.Router();

let libSchema = require("../Models/library_schema");

libRouter.route("/create-user").post((req, res, next) => {
  libSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
});

libRouter.route("/").get((req, res) => {
  libSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

libRouter.route("/get-user/:id").get((req, res) => {
  libSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

libRouter.route("/update-user/:id").put((req, res, next) => {
  libSchema.findByIdAndUpdate(
    req.params.id,

    {
      $set: req.body,
    },

    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);

        console.log("user updated successfully !");
      }
    }
  );
});

libRouter.route("/delete-user/:id").delete((req, res, next) => {
  libSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = libRouter;
