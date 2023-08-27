import React, { useState } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import "./cartrenthistory.css";
import History from "./History";
import BookingHistrory from "./BookingHistrory";

const CartHisandRent = () => {
  const [activeTab, setActiveTab] = useState("Buy");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="cartrenthistory-container">
      <Typography variant="h4" component="h1" className="tab-full-container">
        Cart For Buy and Rent
      </Typography>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="Profile Tabs"
        className="tab-full-box"
      >
        <Tab label="Buy" value="Buy" />
        <Tab label="Rent" value="Rent" />
      </Tabs>

      {activeTab === "Buy" && <BookingHistrory />}
      {activeTab === "Rent" && <History />}
    </div>
  );
};

export default CartHisandRent;
