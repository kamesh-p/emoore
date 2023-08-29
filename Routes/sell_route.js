let mongoose = require("mongoose"),
  express = require("express"),
  sellRouter = express.Router();

// selling Model

let sellingSchema = require("../Models/sell_schema");

const nodemailer = require("nodemailer");

const Mailgen = require("mailgen");

const { EMAIL, PASSWORD } = require("../env");

// // CREATE selling

sellRouter.route("/create-user").post(async (req, res, next) => {
  try {
    const sellData = req.body;

    const data = await sellingSchema.create(sellData);

    let transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: EMAIL,

        pass: PASSWORD, //this is gmail app specific password
      },
    });

    let MailGenerator = new Mailgen({
      theme: "default",

      product: {
        name: "E-Moore Order",

        link: "https://mailgen.js/",
      },
    });

    let response = {
      body: {
        name: sellData.user.Users.name,

        intro: "Selling book details!",

        table: {
          data: {
            author: sellData.author,

            book: sellData.title,

            description: sellData.description,

            classification: sellData.classification,

            Education: sellData.education,

            Genre: sellData.Genre,

            language: sellData.langage,

            price: `Rs ${sellData.price}`,
          },
        },

        outro: "You will notified on your book status..",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL,

      to: sellData.user.Users.email,

      subject: "Sell Details",

      html: mail,
    };

    transporter.sendMail(message);

    console.log(data);

    res.json(data);
  } catch (error) {
    console.error("Error placing order:", error);

    res.status(500).json({ error: "Error placing order" });
  }
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
