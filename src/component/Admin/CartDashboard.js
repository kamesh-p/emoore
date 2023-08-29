import React, { useState, useEffect } from "react";
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
import "./CartDashboard.css";
const CartDashboard = ({ carthistory }) => {
  const titles = carthistory.flatMap((order) =>
    order.items.map((item) => item.title)
  );
  const titleCounts = titles.reduce((countMap, title) => {
    countMap[title] = (countMap[title] || 0) + 1;
    return countMap;
  }, {});

  const chartData = Object.keys(titleCounts).map((title) => ({
    title,
    salesCount: titleCounts[title],
  }));
  const isLoading = carthistory.length === 0;

  return (
    <div className="bookshop-booksales-container">
      <div className="shop-buy-history-container">
        <Container className="history-container">
          <Typography variant="h2" gutterBottom className="history-heading">
            Order History
          </Typography>
          {isLoading ? (
            <div className="spinner-container">
              <CircularProgress />
            </div>
          ) : carthistory.length === 0 ? (
            <Typography variant="body1" className="no-history-message">
              You have no order history.
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              elevation={3}
              className="history-item"
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell>Total Price</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {carthistory.map((book, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {book.items.map((item, itemIndex) => (
                          <Typography key={itemIndex}>{item.title}</Typography>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Typography>Total Price: {book.totalPrice}</Typography>
                      </TableCell>
                      <TableCell>
                        <TableCell>{book.user.Users.name}</TableCell>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </div>
      <div className="chartdashcontainer">
        <BarChart
          className="rented-bargraph"
          width={600}
          height={400}
          data={chartData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="title" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="salesCount" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default CartDashboard;
