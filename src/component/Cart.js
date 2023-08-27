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

  const user = useSelector((state) => state.auth.user);

  const handlePlaceOrderClick = () => {
    setDialogOpen(true);
  };

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
    setConfirmation(true);
    setCart([]);
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

  // console.log("order", orders);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  console.log("cart", isAuthenticated);

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
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="summary-tile">
              <div className="">{item.title}</div>
              <div> {item.price}</div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <p>Subtotal: {getTotalCartPrice()}</p>
          <p>Tax: {calculateTax()}</p>
          <p>Total: {calculateTotal()}</p>
        </div>

        {isAuthenticated ? (
          <Button
            className="Cart-price-orde-btn"
            variant="contained"
            color="success"
            size="small"
            onClick={handlePlaceOrderClick}
          >
            Place order
          </Button>
        ) : (
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
        )}
      </div>

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
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Address"
              type="Address"
              multiline
              fullWidth
              onChange={(e) => setAddress(e.target.value)}
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
              onChange={(e) => setPaymentType(e.target.value)}
            >
              <br />

              <Grid spacing={2}>
                <FormControlLabel
                  value="creditCard"
                  control={<Radio />}
                  label="Credit Card"
                />

                <FormControlLabel
                  value="paypal"
                  control={<Radio />}
                  label="PayPal"
                />

                <FormControlLabel
                  value="Cash On Delivery"
                  control={<Radio />}
                  label="Cash On Delivery"
                />
              </Grid>
            </RadioGroup>

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
    </div>
  );
};

export default Cart;
{
  /*

<div className="cart-item" key={index}>
            <div>
              <img src={item.imagelink} alt={item.title}></img>
            </div>

            {item.title}
            <div>
             <IconButton
              aria-label="Decrease Quantity"
              onClick={() => handleDecreaseQuantity(index)}
              color="error"
            >
              <RemoveIcon />
            </IconButton> 
            </div>
            

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
          .slice(0, item.title.indexOf(":"))*/
}
