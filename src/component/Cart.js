import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  TextField,
  DialogContentText,
} from "@mui/material";
import "./Cart.css";
import { Link } from "react-router-dom";
import { RadioGroup, Radio, FormControlLabel, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { toast } from "react-toastify";
import Login from "./Login";
import PaymentPage from "./Payment";

const Cart = ({ cartItems, handleRemoveItem }) => {
  const [cart, setCart] = useState(cartItems);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [paymentType, setPaymentType] = useState("");

  const [confirmation, setConfirmation] = useState(false);

  const [orderDetails, setOrderDetails] = useState({});

  const [orders, setOrders] = useState([]);

  const [name, setName] = useState("");

  const [address, setAddress] = useState("");

  const [detailed, setdetailedorder] = useState([]);
  const [email, setEmail] = useState("");
  const [coupons, setcoupon] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [paymentTypeError, setPaymentTypeError] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const handlePlaceOrderClick = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", { position: "top-right" });
    } else {
      setDialogOpen(true);
    }
  };
  if (user) {
    console.log("sellp", user.Users.SellProduct);
  }
  // console.log("coup", coupons);
  const couponOffers = [
    "get 5% off on books",
    "get 5% off on kfc",
    "get 5% off on Kooku Fm",
  ];
  const couponOffers1 = [
    "get 10% off on books",
    "get 10% off on kfc",
    "get 10% off on Kooku Fm",
  ];
  const couponOffers2 = [
    "get 15% off on books",
    "get 15% off on kfc",
    "get 15% off on Kooku Fm",
  ];

  function getRandomCoupons(count) {
    const selectedCoupons = [];
    while (selectedCoupons.length < count && couponOffers.length > 0) {
      const randomIndex = Math.floor(Math.random() * couponOffers.length);
      selectedCoupons.push(couponOffers[randomIndex]);
      couponOffers.splice(randomIndex, 1);
    }
    return selectedCoupons;
  }
  // const sellProductCount = user?.Users?.SellProduct || 0;

  let randomCoupons = [];

  randomCoupons = getRandomCoupons(1);
  console.log("rc", randomCoupons);

  function getRandomCoupons1(count) {
    const selectedCoupons1 = [];
    while (selectedCoupons1.length < count && couponOffers1.length > 0) {
      const randomIndex = Math.floor(Math.random() * couponOffers1.length);
      selectedCoupons1.push(couponOffers1[randomIndex]);
      couponOffers.splice(randomIndex, 1);
    }
    return selectedCoupons1;
  }
  // const sellProductCount = user?.Users?.SellProduct || 0;

  let randomCoupons1 = [];

  randomCoupons1 = getRandomCoupons1(1);
  console.log("rc1", randomCoupons1);

  function getRandomCoupons2(count) {
    const selectedCoupons2 = [];
    while (selectedCoupons2.length < count && couponOffers2.length > 0) {
      const randomIndex = Math.floor(Math.random() * couponOffers2.length);
      selectedCoupons2.push(couponOffers2[randomIndex]);
      couponOffers2.splice(randomIndex, 1);
    }
    return selectedCoupons2;
  }
  // const sellProductCount = user?.Users?.SellProduct || 0;

  let randomCoupons2 = [];

  randomCoupons2 = getRandomCoupons2(1);
  console.log("rc2", randomCoupons2);

  // setcoupon(randomCoupons);

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cartItems];

    updatedCart[index].quantity += 1;

    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cartItems];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;

      setCart(updatedCart);
    }
  };

  const getTotalPrice = (item) => {
    return item.price * item.quantity;
  };

  const getTotalCartPrice = () => {
    const totalPrice = cartItems.reduce(
      (accumulator, item) => accumulator + getTotalPrice(item),
      0
    );

    return totalPrice;
  };
  const handleSelectedCouponChange = (coupon) => {
    setSelectedCoupon(coupon);
    localStorage.setItem("selectedCoupon", coupon);
  };
  useEffect(() => {
    const storedCoupon = localStorage.getItem("selectedCoupon");
    if (storedCoupon) {
      setSelectedCoupon(storedCoupon);
    }
  }, []);
  const currentDate = new Date();

  const HandleConfirmationbutton = async () => {
    try {
      setConfirmation(true);
      setCart([]);
      setDialogOpen(false);

      const newOrder = {
        user: user,
        name: name,
        email: email,
        address: address,
        paymentType: paymentType,
        items: cartItems,
        totalPrice: getTotalCartPrice(),
        orderDate: currentDate,
      };

      axios.post("http://localhost:4000/orders/create-user", newOrder);

      // Update the orders array with the new order

      setOrders((prevOrders) => [...prevOrders, newOrder]);

      toast.success("Order successfully placed", { position: "top-right" });

      // Reset the input fields and selections

      setOrderDetails([]);

      setName("");
      setEmail("");
      setAddress("");

      setPaymentType("");

      console.log("new order", newOrder);

      setConfirmation(false);

      setdetailedorder(newOrder);
    } catch (error) {
      console.log(error);
    }
  };

  // ... rest of your component code ...

  // console.log("ddd", newOrder);

  console.log("order:", orders);

  console.log("oderrr", orderDetails);

  const HandleConfirmation = () => {
    setConfirmation(true);

    setDialogOpen(false);

    setOrders((prevOrders) => [...prevOrders, orderDetails]);

    setOrderDetails({});
  };

  const HandleCloseConfirmation = () => {
    setConfirmation(false);
  };

  const HandleopenConfirmation = () => {
    // Validate input fields
    if (!name || !email || !address || !paymentType) {
      // Update the corresponding error states to true if fields are empty
      setNameError(!name);
      setEmailError(!email);
      setAddressError(!address);
      setPaymentTypeError(!paymentType);

      // Show Toastify message for incomplete form
      toast.error("Please fill in all required fields", {
        position: "top-right",
      });
    } else {
      // All fields are filled, open the confirmation dialog
      setConfirmation(true);
      setCart([]); // Not sure if you want to clear the cart here or not
    }
  };
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateTax = () => {
    return getTotalCartPrice() * 0.1; // Assuming 10% tax rate
  };

  const calculateTotal = () => {
    return getTotalCartPrice() + calculateTax();
  };

  const handleLogin = () => {
    <Login />;
  };
  // const handlediscount = () => {};
  // const coupon = randomCoupons.forEach();
  // // console.log("order", orders);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("cart", isAuthenticated);
  console.log("user", user);

  return (
    <div className="cart-container">
      <div className="cart-items">
        {cartItems.map((item, index) => (
          <div className="cart-item" key={index}>
            <div>
              <img src={item.imagelink} alt={item.title}></img>
            </div>

            {item.title}
            <div className="cart-buttons">
              {item.quantity === 1 ? (
                <IconButton
                  aria-label="Delete Item"
                  onClick={() => handleRemoveItem(index)}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="Decrease Quantity"
                  onClick={() => handleDecreaseQuantity(index)}
                  color="error"
                >
                  <RemoveIcon />
                </IconButton>
              )}
              <span>{item.quantity}</span>
              <IconButton
                aria-label="Increase Quantity"
                onClick={() => handleIncreaseQuantity(index)}
                color="success"
              >
                <AddIcon />
              </IconButton>

              <span>₹{getTotalPrice(item)}</span>
            </div>
          </div>
        ))}
      </div>

      {isAuthenticated ? (
        <div>
          <div className="cart-summary">
            <h2 className="h2-cart-summart">Cart Summary</h2>
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="summary-tile">
                  <div className="">{item.title}</div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <p>Subtotal: {getTotalCartPrice()}</p>
              {user?.Users?.SellProduct > 10 &&
                user?.Users?.SellProduct <= 20 &&
                coupons && (
                  <div className="random-coupon">
                    <h3>Random Coupon Offer:</h3>
                    {randomCoupons.map((coupon, index) => {
                      const couponParts = coupon.split(" "); // Split the coupon text by spaces
                      const percentageValue = parseFloat(couponParts[1]);
                      const total = calculateTotal();
                      const discountedTotal =
                        total - (total * percentageValue) / 100; // Extract the percentage value

                      if (
                        !isNaN(percentageValue) &&
                        coupon.toLowerCase().includes("book")
                      ) {
                        return (
                          <div>
                            <p key={index}>
                              Coupon: {coupon}
                              <br />
                              Percentage Value: {percentageValue}%
                            </p>
                            <p>Discount total:{discountedTotal}</p>
                          </div>
                        );
                      }
                      return <p>{randomCoupons[0]}</p>;
                    })}
                  </div>
                )}

              {user?.Users?.SellProduct > 20 &&
                user?.Users?.SellProduct <= 30 &&
                coupons && (
                  <div className="random-coupon">
                    <h3>Random Coupon Offer:</h3>
                    {randomCoupons1.map((coupon, index) => {
                      const couponParts = coupon.split(" "); // Split the coupon text by spaces
                      const percentageValue = parseFloat(couponParts[1]);
                      const total = calculateTotal();
                      const discountedTotal =
                        total - (total * percentageValue) / 100; // Extract the percentage value

                      if (
                        !isNaN(percentageValue) &&
                        coupon.toLowerCase().includes("book")
                      ) {
                        return (
                          <div>
                            <p key={index}>
                              Coupon: {coupon}
                              <br />
                              Percentage Value: {percentageValue}%
                            </p>
                            <p>Discount total:{discountedTotal}</p>
                          </div>
                        );
                      }
                      return <p>{randomCoupons1[0]}</p>;
                    })}
                  </div>
                )}
              {user?.Users?.SellProduct > 30 && coupons && (
                <div className="random-coupon">
                  <h3>Random Coupon Offer:</h3>
                  {randomCoupons2.map((coupon, index) => {
                    const couponParts = coupon.split(" "); // Split the coupon text by spaces
                    const percentageValue = parseFloat(couponParts[1]);
                    const total = calculateTotal();
                    const discountedTotal =
                      total - (total * percentageValue) / 100; // Extract the percentage value

                    if (
                      !isNaN(percentageValue) &&
                      coupon.toLowerCase().includes("book")
                    ) {
                      return (
                        <div>
                          <p key={index}>
                            Coupon: {coupon}
                            <br />
                            Percentage Value: {percentageValue}%
                          </p>
                          <p>Discount total:{discountedTotal}</p>
                        </div>
                      );
                    }
                    return <p>{randomCoupons2[0]}</p>;
                  })}
                </div>
              )}

              <p>Tax: {calculateTax()}</p>

              <p>Total: {calculateTotal()}</p>
            </div>

            <Button
              className="Cart-price-orde-btn"
              variant="contained"
              color="success"
              size="small"
              onClick={handlePlaceOrderClick}
            >
              Place order
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="cart-summary">
            <h2 className="h2-cart-summart">Cart Summary</h2>
            <div>
              {cartItems.map((item) => (
                <div key={item.id} className="summary-tile">
                  <div className="">{item.title}</div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <p>Subtotal: {getTotalCartPrice()}</p>
              <p>Tax: {calculateTax()}</p>
              <p>Total: {calculateTotal()}</p>
            </div>
            <Link to="/login">
              <Button
                className="Cart-price-orde-btn"
                variant="contained"
                color="error"
                size="medium"
                type="submit"
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}

      {dialogOpen && isAuthenticated && (
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>Order Details</DialogTitle>

          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your address here. We
              will send updates occasionally.
            </DialogContentText>

            <br></br>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              fullWidth
              error={nameError}
              helperText={nameError ? "Name is required" : ""}
              onChange={(e) => {
                setName(e.target.value);
                setNameError(false); // Clear the error when user types
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              error={emailError}
              helperText={emailError ? "Email is required" : ""}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(false); // Clear the error when user types
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="address"
              label="Address"
              type="Address"
              multiline
              fullWidth
              error={addressError}
              helperText={addressError ? "Address is required" : ""}
              onChange={(e) => {
                setAddress(e.target.value);
                setAddressError(false); // Clear the error when user types
              }}
            />

            <div className="cart-container-Cart">
              <Grid container spacing={2}>
                {cartItems.map((item) => (
                  <Grid item xs={6} key={item.id}>
                    <Paper
                      sx={{ padding: 2 }}
                      className="Book-list-details-paper"
                    >
                      <Typography variant="subtitle1">{item.name}</Typography>

                      <Typography variant="body2">
                        Quantity: {item.quantity} | Price: ${item.price} |
                        total: ₹{getTotalCartPrice()}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </div>

            <RadioGroup
              className="radio-list"
              name="paymentType"
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
                setPaymentTypeError(false); // Clear the error when user selects
              }}
              error={paymentTypeError}
            >
              <br />

              <Grid spacing={2}>
                <FormControlLabel
                  value="creditCard"
                  control={<Radio />}
                  label="Credit Card"
                />

                <FormControlLabel
                  value="debitCard"
                  control={<Radio />}
                  label="debitCard"
                />

                <FormControlLabel
                  value="Cash On Delivery"
                  control={<Radio />}
                  label="Cash On Delivery"
                />
              </Grid>
            </RadioGroup>
            {paymentType === "creditCard" || paymentType === "debitCard" ? (
              <PaymentPage />
            ) : null}

            <br />

            <Paper sx={{ padding: 2, marginBottom: 2 }}>
              <Typography variant="subtitle1">
                Order Total: ₹{getTotalCartPrice()}
              </Typography>
            </Paper>
          </DialogContent>

          <DialogActions>
            <Button color="error" onClick={handleCloseDialog}>
              Cancel
            </Button>

            <Button
              // variant="outlined"

              color="success"
              onClick={HandleopenConfirmation}
            >
              Order
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Order confirmation dialog */}

      {confirmation && (
        <Dialog open={confirmation} onClose={HandleCloseConfirmation}>
          <DialogTitle>Confirmation</DialogTitle>

          <DialogContent>
            <DialogContentText>
              Are you sure you want to place the order?
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={HandleCloseConfirmation}>Cancel</Button>
            {/* <StripeCheckout
              amount={calculateTotal()}
              billingAddress
              stripeKey="pk_test_51IYnC0SIR2AbPxU0TMStZwFUoaDZle9yXVygpVIzg36LdpO8aSG8B9j2C0AikiQw2YyCI8n4faFYQI5uG3Nk5EGQ00lCfjXYvZ"
            >
            </StripeCheckout> */}
            <Button color="success" onClick={HandleConfirmationbutton}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {/* {paymentType === "creditCard" || paymentType === "debitCard" ? (
        <PaymentPage />
      ) : null} */}
    </div>
  );
};

export default Cart;
