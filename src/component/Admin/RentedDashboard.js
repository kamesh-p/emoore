import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import "./Renteddashboard.css";
const RentedDashboard = ({ rented }) => {
  const isLoading = rented.length === 0;
  // Process the data for the chart
  const rentedCountByTitle = {};
  rented.forEach((rentedBook) => {
    const bookTitle = rentedBook.title;
    rentedCountByTitle[bookTitle] = (rentedCountByTitle[bookTitle] || 0) + 1;
  });

  const chartData = Object.keys(rentedCountByTitle).map((title) => ({
    name: title,
    rentedCount: rentedCountByTitle[title],
  }));

  return (
    <div className="rented-flex-details">
      <div className="container-rented">
        <Container className="history-container">
          <Typography variant="h6" gutterBottom className="history-heading">
            Order History
          </Typography>
          {isLoading ? (
            <div className="spinner-container">
              <CircularProgress />
            </div>
          ) : rented.length === 0 ? (
            <Typography variant="body1" className="no-history-message">
              You have no order history.
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              elevation={3}
              className="history-table"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Price (Rs.)</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>Days</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rented.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {book.title}
                      </TableCell>
                      <TableCell>{book.price}</TableCell>
                      <TableCell>{book.endDate}</TableCell>
                      <TableCell>{book.startDate}</TableCell>
                      <TableCell>{book.days}</TableCell>
                      <TableCell>{book.users.Users.name}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </div>

      <div>
        <BarChart
          className="rented-bargraph"
          width={600}
          height={300}
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rentedCount" fill="rgba(75, 192, 192, 0.6)" />
        </BarChart>
      </div>
    </div>
  );
};

export default RentedDashboard;
