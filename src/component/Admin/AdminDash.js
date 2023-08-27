import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./AdminDash.css";

function AdminDashboard() {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="Admindash-full-contained">
      <Container className="container-AdminDash">
        <Paper elevation={3} className="paper-container-AdminDash">
          <Typography variant="h4" gutterBottom>
            Requested Rented books
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table-header-AdminDash">
                    Title
                  </TableCell>
                  <TableCell className="table-header-AdminDash">
                    Start Dates
                  </TableCell>
                  <TableCell className="table-header-AdminDash">
                    End Dates
                  </TableCell>
                  <TableCell className="table-header-AdminDash">Days</TableCell>
                  <TableCell className="table-header-AdminDash">
                    Price
                  </TableCell>
                  <TableCell className="table-header-AdminDash">
                    Cancel
                  </TableCell>
                  <TableCell className="table-header-AdminDash">
                    Confirm
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {books.map((book) => (
                  <TableRow key={book._id} className="table-row-AdminDash">
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.startDate}</TableCell>
                    <TableCell>{book.endDate}</TableCell>
                    <TableCell>{book.days}</TableCell>
                    <TableCell>{book.price} Rs.</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        className="reject-button-AdminDash"
                        color="error"
                      >
                        Reject
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        className="confirm-button-AdminDash"
                        color="success"
                      >
                        Confirm
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}

export default AdminDashboard;
