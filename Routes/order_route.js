let mongoose = require("mongoose"),
  express = require("express"),
  orderRouter = express.Router();

let orderSchema = require("../Models/order_Schema");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { EMAIL, PASSWORD } = require("../env");

orderRouter.route("/create-user").post(async (req, res, next) => {
  try {
    const newOrder = req.body;

    const data = await orderSchema.create(newOrder);

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
        name: newOrder.name,

        intro: "Thank you for your order!",

        table: {
          data: newOrder.items.map((item) => ({
            author: item.author,

            item: item.title,

            description: item.description,

            price: `Rs ${item.price}`,

            totalprice: `Rs ${newOrder.totalPrice}`,
          })),
        },

        outro: "We appreciate your time and interest..",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: EMAIL,

      to: newOrder.email,

      subject: "Order Confirmation",

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

orderRouter.route("/").get((req, res) => {
  orderSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

orderRouter.route("/get-user/:id").get((req, res) => {
  orderSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

orderRouter.route("/update-user/:id").put((req, res, next) => {
  orderSchema.findByIdAndUpdate(
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

orderRouter.route("/delete-user/:id").delete((req, res, next) => {
  orderSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data,
      });
    }
  });
});

// make payment

// router.post("/make-payment", async (req, res) => {
//   try {
//     const { token, amount } = req.body;

//     const customer = await stripe.customers.create({
//       email: token.email,

//       source: token.id,
//     });

//     const charge = await stripe.charges.create({
//       amount: amount,

//       currency: "Rs",

//       customer: customer.id,

//       receipt_email: token.email,

//       description: "Order placed",
//     });

//     const transactionId = charge.id;

//     res.send({
//       success: true,

//       message: "Payment successful",

//       data: transactionId,
//     });
//   } catch (error) {
//     res.send({
//       success: true,

//       message: "",
//     });
//   }
// });

module.exports = orderRouter;
