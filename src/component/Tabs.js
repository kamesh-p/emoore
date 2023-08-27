import React, { useState } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import "./Tab.css";
import Cart from "./Cart";
import Library from "./Library";

const Profile = ({
  cartItems,
  handleRemoveItem,
  rentedBooks,
  onDeleteBook,
}) => {
  const [activeTab, setActiveTab] = useState("Cart");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
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
        <Tab label="Cart" value="Cart" />
        <Tab label="Library" value="Library" />
      </Tabs>

      {activeTab === "Cart" && (
        <Cart cartItems={cartItems} handleRemoveItem={handleRemoveItem} />
      )}
      {activeTab === "Library" && (
        <Library rentedBooks={rentedBooks} onDeleteBook={onDeleteBook} />
      )}
    </div>
  );
};

export default Profile;
