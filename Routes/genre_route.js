let mongoose = require("mongoose"),
  express = require("express"),
  genreRouter = express.Router();

let genreSchema = require("../Models/genre_Schema");

genreRouter.route("/create-user").post((req, res, next) => {
  genreSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);

      res.json(data);
    }
  });
});

genreRouter.route("/").get((req, res) => {
  genreSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

genreRouter.route("/get-user/:id").get((req, res) => {
  genreSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

genreRouter.route("/update-user/:id").put((req, res, next) => {
  genreSchema.findByIdAndUpdate(
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

genreRouter.route("/delete-user/:id").delete((req, res, next) => {
  genreSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

module.exports = genreRouter;
