import React, { useState } from "react";
import { Typography, Tab, Tabs } from "@mui/material";
import "../Tab.css";

import SellDetails from "../SellDetails";
import AdminDashboard from "./AdminDash";
import RentedSubcribtion from "./RentedSubcribtion";

const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState("Sell");

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
        <Tab label="Sell" value="Sell" />
        <Tab label="Rented" value="Rented" />
      </Tabs>

      {activeTab === "Sell" && <SellDetails />}
      {activeTab === "Rented" && <RentedSubcribtion />}
    </div>
  );
};

export default AdminTabs;
