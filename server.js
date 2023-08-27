let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
const morgan = require("morgan");

const bookRoute = require("../backend/Routes/book_route");
const userRoute = require("../backend/Routes/user_route");
const sellRoute = require("../backend/Routes/sell_route");
const orderRoute = require("../backend/Routes/order_route");
const genreRoute = require("../backend/Routes/genre_route");
const libRoute = require("../backend/Routes/library_route");

mongoose
  .connect("mongodb://127.0.0.1:27017/Moore")
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/selling", sellRoute);
app.use("/orders", orderRoute);
app.use("/genre", genreRoute);
app.use("/library", libRoute);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Connected to port " + port);
});

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const stripe = require("stripe")(
  "sk_test_51NiaLhSIwBLKwQnwwZbbwxDLKxOJdUi0C2ZFu0xweYWTiZDAEMZApoYpy6a72kBT95PHNcKMmJM8FpphoqYhbKMf00u7cGP4Rc"
);

app.use(bodyParser.json());

app.post("/generate-token", async (req, res) => {
  try {
    // Use the Stripe API to create a token
    const token = await stripe.tokens.create({
      card: {
        // You can customize card details here
        number: req.body.cardNumber,
        exp_month: req.body.expMonth,
        exp_year: req.body.expYear,
        cvc: req.body.cvc,
      },
    });

    res.json({ token });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while generating token." });
  }
});
