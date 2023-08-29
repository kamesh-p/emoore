import React, { useEffect, useState } from "react";
import {
  Typography,
  Tab,
  Tabs,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import "./Dashboard.css";
import RentedDashboard from "./RentedDashboard";
import CartDashboard from "./CartDashboard";
import BookingHistory from "../BookingHistrory";
import SellDetails from "../SellDetails";

const Dashboard = () => {
  const [carthistory, setCarthistory] = useState([]);
  const [rented, setRented] = useState([]);
  const [topAuthors, setTopAuthors] = useState([]);
  const [topOrderedBooks, setTopOrderedBooks] = useState([]);
  const [topRentedBooks, setTopRentedBooks] = useState([]);
  const [activeTab, setActiveTab] = useState("Buy");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    fetch("http://localhost:4000/library")
      .then((response) => response.json())
      .then((data) => setRented(data))
      .catch((error) => console.error("Error fetching rented data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((response) => response.json())
      .then((data) => setCarthistory(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const authorFrequency = {};

    carthistory.forEach((order) => {
      order.items.forEach((item) => {
        const author = item.author;
        if (author in authorFrequency) {
          authorFrequency[author]++;
        } else {
          authorFrequency[author] = 1;
        }
      });
    });

    const sortedAuthors = Object.keys(authorFrequency).sort(
      (a, b) => authorFrequency[b] - authorFrequency[a]
    );

    // Get the top five authors
    const topAuthors = sortedAuthors.slice(0, 5);
    setTopAuthors(topAuthors);
  }, [carthistory]);

  useEffect(() => {
    const bookTitleFrequency = {};

    carthistory.forEach((order) => {
      order.items.forEach((item) => {
        const title = item.title;

        if (title in bookTitleFrequency) {
          bookTitleFrequency[title]++;
        } else {
          bookTitleFrequency[title] = 1;
        }
      });
    });

    const sortedBookTitles = Object.keys(bookTitleFrequency).sort(
      (a, b) => bookTitleFrequency[b] - bookTitleFrequency[a]
    );

    const topOrderedBooks = sortedBookTitles.slice(0, 5);
    setTopOrderedBooks(topOrderedBooks);
  }, [carthistory]);

  useEffect(() => {
    const rentedBookFrequency = {};

    rented.forEach((item) => {
      const title = item.title;

      if (title in rentedBookFrequency) {
        rentedBookFrequency[title]++;
      } else {
        rentedBookFrequency[title] = 1;
      }
    });

    const sortedRentedBookTitles = Object.keys(rentedBookFrequency).sort(
      (a, b) => rentedBookFrequency[b] - rentedBookFrequency[a]
    );

    // Get the top five rented book titles
    const topRentedBooks = sortedRentedBookTitles.slice(0, 5);
    setTopRentedBooks(topRentedBooks);
  }, [rented]);

  return (
    <div className="container-drawer-dashboard">
      <div className="top-list-component">
        {/* <div className="topbookcontainer">
          <Typography variant="h6">Top Five Authors books</Typography>
          <List>
            {topAuthors.map((author, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    author.length > 20 ? `${author.slice(0, 17)}...` : author
                  }
                />
              </ListItem>
            ))}
          </List>
        </div> */}
        {/* <div className="topbookcontainer">
          <Typography variant="h6">Top Five Ordered Books</Typography>
          <List>
            {topOrderedBooks.map((bookTitle, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    bookTitle.length > 20
                      ? `${bookTitle.slice(0, 17)}...`
                      : bookTitle
                  }
                />
              </ListItem>
            ))}
          </List>
        </div> */}
        {/* <div className="topbookcontainer">
          <Typography variant="h6">Top Five Rented Books</Typography>
          <List>
            {topRentedBooks.map((bookTitle, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    bookTitle.length > 20
                      ? `${bookTitle.slice(0, 17)}...`
                      : bookTitle
                  }
                />
              </ListItem>
            ))}
          </List>
        </div> */}

        <div className="topbookcontainer">
          <Typography variant="h6">Top Five Authors books</Typography>
          <List>
            {topAuthors.map((author, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    author.length > 20 ? `${author.slice(0, 17)}...` : author
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="topbookcontainer">
          <Typography variant="h6">Top Five Ordered Books</Typography>
          <List>
            {topOrderedBooks.map((bookTitle, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    bookTitle.length > 20
                      ? `${bookTitle.slice(0, 17)}...`
                      : bookTitle
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="topbookcontainer">
          <Typography variant="h6">Top Five Rented Books</Typography>
          <List>
            {topRentedBooks.map((bookTitle, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    bookTitle.length > 20
                      ? `${bookTitle.slice(0, 17)}...`
                      : bookTitle
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div>
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

        {activeTab === "Buy" && <CartDashboard carthistory={carthistory} />}
        {activeTab === "Rent" && <RentedDashboard rented={rented} />}
      </div>
    </div>
  );
};

export default Dashboard;
