import React, { useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { fetchBooks } from "../store/authSlice";
import "./Selldetails.css";

const SellDetails = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const [deletedBooks, setDeletedBooks] = useState([]);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleCancel = async (book) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/selling/delete-selling/${book._id}`
      );
      setDeletedBooks((prevDeletedBooks) => [...prevDeletedBooks, book._id]);
      console.log("Book canceled and deleted:", response.data);
    } catch (error) {
      console.error("Error canceling book:", error);
    }
  };

  const handleConfirm = async (book) => {
    const userId = book.user.Users._id;
    console.log("userid", userId);
    try {
      axios
        .put(`http://localhost:4000/users/update-user-sell/${userId}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
      const response = await axios.post(
        "http://localhost:4000/books/create-user",
        book
      );
      console.log("Book confirmed and posted:", response.data);
      await axios.delete(
        `http://localhost:4000/selling/delete-selling/${book._id}`
      );
      setDeletedBooks((prevDeletedBooks) => [...prevDeletedBooks, book._id]);
    } catch (error) {
      console.error("Error posting book:", error);
    }
  };
  console.log("db", books);
  return (
    <div className="selldetails-full-container">
      <Container maxWidth="lg" className="container-selldetails-box">
        {/* <Typography variant="h4" component="h1" className="title">
          Sell Details
        </Typography> */}

        {books.length === 0 ? (
          <Typography variant="body1" className="empty-text">
            No books to display.
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell>Users</TableCell> */}
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Classification</TableCell>
                  <TableCell>Education</TableCell>
                  <TableCell>Genre</TableCell>
                  <TableCell>Language</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Cancel</TableCell>
                  <TableCell>Confirm</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(
                  (book, index) =>
                    !deletedBooks.includes(book._id) && (
                      <TableRow key={index}>
                        {/* <TableCell>{book.users.Users.name}</TableCell> */}
                        <TableCell>{book.title}</TableCell>
                        <TableCell>{book.description}</TableCell>
                        <TableCell>{book.author}</TableCell>
                        <TableCell>{book.classification}</TableCell>
                        <TableCell>{book.Education}</TableCell>
                        <TableCell>{book.Genre}</TableCell>
                        <TableCell>{book.language}</TableCell>

                        <TableCell>₹{book.price}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleCancel(book)}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleConfirm(book)}
                          >
                            Confirm
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
};

export default SellDetails;
