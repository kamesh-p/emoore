import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Tab,
  Tabs,
  Paper,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "./UserDetails.css";
import Selluserdetails from "./selluserdetails";
import Renteduserdetails from "./renteduserdetails";
import Buyuserdetails from "./Buyuserdetails";

const UserDetail = () => {
  const { userId } = useParams();
  const [users, setusers] = useState([]);
  const [selling, setselling] = useState([]);
  const [Library, setlibrary] = useState([]);
  const [order, setorder] = useState([]);
  const [activeTab, setActiveTab] = useState("Buy");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    fetch("http://localhost:4000/users")
      .then((response) => response.json())
      .then((data) => setusers(data))
      .catch((error) => console.error("Error fetching users data:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/selling")
      .then((response) => response.json())
      .then((data) => setselling(data))
      .catch((error) => console.error("Error fetching selling data:", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/library")
      .then((response) => response.json())
      .then((data) => setlibrary(data))
      .catch((error) => console.error("Error fetching selling data:", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((response) => response.json())
      .then((data) => setorder(data))
      .catch((error) => console.error("Error fetching selling data:", error));
  }, []);

  const userDetail = users.find((user) => user._id === userId);

  if (!userDetail) {
    return <div>Loading...</div>;
  }

  const userSelling = selling.filter(
    (item) => item.user.Users._id === userDetail._id
  );
  const userRented = Library.filter(
    (item) => item.users.Users._id === userDetail._id
  );
  const userOrder = order.filter(
    (item) => item.user.Users._id === userDetail._id
  );
  console.log("selling", userSelling);
  console.log("library", userRented);
  console.log("order", userOrder);

  return (
    <div className="container-userdetails">
      <Container>
        <Typography variant="h4">User Details</Typography>
        <div className="container-userdetials-admin">
          <Container maxWidth="sm" className="user-details">
            <Paper elevation={3} className="user-details-paper">
              <Table className="user-details-table">
                <TableBody>
                  <TableRow>
                    <TableCell
                      className="user-details-header-cell"
                      component="th"
                      scope="row"
                    >
                      Name:
                    </TableCell>
                    <TableCell className="user-details-cell">
                      {userDetail.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="user-details-header-cell"
                      component="th"
                      scope="row"
                    >
                      Email:
                    </TableCell>
                    <TableCell className="user-details-cell">
                      {userDetail.email}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="user-details-header-cell"
                      component="th"
                      scope="row"
                    >
                      Language
                    </TableCell>
                    <TableCell className="user-details-cell">
                      {userDetail.language[0]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="user-details-header-cell"
                      component="th"
                      scope="row"
                    >
                      Genre
                    </TableCell>
                    <TableCell className="user-details-cell">
                      {userDetail.genre[0]}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="user-details-header-cell"
                      component="th"
                      scope="row"
                    >
                      Education
                    </TableCell>
                    <TableCell className="user-details-cell">
                      {userDetail.education}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="user-details-header-cell"
                      component="th"
                      scope="row"
                    >
                      Typre
                    </TableCell>
                    <TableCell className="user-details-cell">
                      {userDetail.Type}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      className="user-details-header-cell"
                      component="th"
                      scope="row"
                    >
                      RentedSub
                    </TableCell>
                    <TableCell className="user-details-cell">
                      {userDetail.RentedSub}
                    </TableCell>
                  </TableRow>
                  {/* ... (other rows) ... */}
                </TableBody>
              </Table>
            </Paper>
          </Container>
        </div>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="halfwidth"
          indicatorColor="primary"
          textColor="primary"
          aria-label="Profile Tabs"
        >
          <Tab label="Buy" value="Buy" />
          <Tab label="Rent" value="Rent" />
          <Tab label="Sell" value="Sell" />
        </Tabs>

        {activeTab === "Buy" && <Buyuserdetails userOrder={userOrder} />}
        {activeTab === "Rent" && <Renteduserdetails userRented={userRented} />}
        {activeTab === "Sell" && (
          <Selluserdetails userSelling={userSelling} userDetail={userDetail} />
        )}
      </Container>
    </div>
  );
};

export default UserDetail;
