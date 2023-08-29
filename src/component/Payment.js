import React, { useState } from "react";

import { TextField, Button, Grid, Typography } from "@mui/material";

import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import CancelIcon from "@mui/icons-material/Cancel";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./Payment.css";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");

  const [cardHolder, setCardHolder] = useState("");

  const [expiryDate, setExpiryDate] = useState("");

  const [cvv, setCvv] = useState("");

  const [cardNumberTouched, setCardNumberTouched] = useState(false);

  const [cardHolderTouched, setCardHolderTouched] = useState(false);

  const [expiryDateTouched, setExpiryDateTouched] = useState(false);

  const [cvvTouched, setCvvTouched] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      setTimeout(() => {
        navigate("/confirmation", { replace: true });
      }, 1000);
    }
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);

    setCardNumberTouched(true);
  };

  const handleCardHolderChange = (e) => {
    const value = e.target.value;

    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCardHolder(value);
    }

    setCardHolderTouched(true);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value;

    const currentYear = new Date().getFullYear();

    const inputYear = Number(value.substring(0, 4));

    if (inputYear >= currentYear && inputYear <= currentYear + 10) {
      setExpiryDate(value);
    }

    setExpiryDateTouched(true);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,3}$/.test(value)) {
      setCvv(value);
    }

    setCvvTouched(true);
  };

  const isFormValid = () => {
    return (
      cardNumber.length === 16 &&
      /^[a-zA-Z\s]*$/.test(cardHolder) &&
      expiryDateTouched &&
      /^\d{3}$/.test(cvv)
    );
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={8} md={6}>
        <div className="payment-container">
          <form className="f1" onSubmit={handleSubmit}>
            <div className="f1">
              <Typography variant="body1" component="label" className="l1">
                Card Number
              </Typography>

              <TextField
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                inputProps={{ maxLength: 16 }}
                className="ino1"
                placeholder="Enter 16 digit number.."
                required
                error={cardNumberTouched && cardNumber.length !== 16}
                helperText={
                  cardNumberTouched && cardNumber.length !== 16
                    ? "Must be 16 digits"
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <>
                      {cardNumberTouched && (
                        <>
                          {cardNumber.length === 16 ? (
                            <CheckCircleIcon
                              style={{ color: "green", margin: "9px" }}
                            />
                          ) : (
                            <CancelIcon color="error" />
                          )}
                        </>
                      )}
                    </>
                  ),
                }}
              />
            </div>

            <div className="f1">
              <Typography variant="body1" component="label">
                Card Holder
              </Typography>

              <TextField
                type="text"
                value={cardHolder}
                onChange={handleCardHolderChange}
                className="ino1"
                placeholder="Enter card holder name..."
                required
                error={cardHolderTouched && !/^[a-zA-Z\s]*$/.test(cardHolder)}
                helperText={
                  cardHolderTouched && !/^[a-zA-Z\s]*$/.test(cardHolder)
                    ? "Only letters and spaces allowed"
                    : ""
                }
              />
            </div>

            <div className="f1">
              <Typography variant="body1" component="label">
                Expiry Date (YYYY-MM)
              </Typography>

              <TextField
                type="month"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                InputProps={{
                  inputProps: {
                    min: new Date().toISOString().split("T")[0].slice(0, 7),

                    max: new Date(new Date().getFullYear() + 10, 11)
                      .toISOString()
                      .split("T")[0]
                      .slice(0, 7),
                  },
                }}
                className="ino1"
                required
                error={
                  expiryDateTouched &&
                  (!expiryDate.match(/^\d{4}-\d{2}$/) ||
                    new Date(expiryDate) >
                      new Date(new Date().getFullYear() + 10, 11))
                }
                helperText={
                  expiryDateTouched &&
                  ((!expiryDate.match(/^\d{4}-\d{2}$/)
                    ? "Invalid format"
                    : "") ||
                    (new Date(expiryDate) >
                    new Date(new Date().getFullYear() + 10, 11)
                      ? "Date should not be more than 10 years from now"
                      : ""))
                }
              />
            </div>

            <div className="f1">
              <Typography variant="body1" component="label">
                CVV
              </Typography>

              <TextField
                type="text"
                value={cvv}
                onChange={handleCvvChange}
                inputProps={{ maxLength: 3 }}
                className="ino1"
                placeholder="Enter CVV..."
                required
                error={cvvTouched && !/^\d{3}$/.test(cvv)}
                helperText={
                  cvvTouched && !/^\d{3}$/.test(cvv) ? "Must be 3 digits" : ""
                }
              />
            </div>

            <Button className="b1" type="submit" disabled={!isFormValid()}>
              Pay Now
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default PaymentPage;
