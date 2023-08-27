import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";

const History = () => {
  const [books, setBooks] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const isLoading = books.length === 0;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/library/");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography variant="h4" gutterBottom>
          No History Found
        </Typography>
        <Typography>Please log in to view your history.</Typography>
      </Container>
    );
  }

  const filteredBooks = books.filter(
    (book) => book.users.Users.name === user.Users.name
  );

  return (
    <Container className="history-container">
      <Typography variant="h4" gutterBottom className="history-heading">
        Order History
      </Typography>
      {isLoading ? (
        <div className="spinner-container">
          <CircularProgress />
        </div>
      ) : filteredBooks.length === 0 ? (
        <Typography variant="body1" className="no-history-message">
          You have no order history.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Price (Rs.)</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Days</TableCell>
                <TableCell>Order ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredBooks.map((book, index) => (
                <TableRow key={index}>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.price} Rs.</TableCell>
                  <TableCell>{book.endDate}</TableCell>
                  <TableCell>{book.startDate}</TableCell>
                  <TableCell>{book.days}</TableCell>
                  <TableCell>{book.orderId}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default History;
