import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Send as SendIcon } from "@mui/icons-material";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Divider,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import "./bookdetail.css";

const Container = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(8),
  display: "flex",
  alignItems: "center",
}));

const Media = styled(CardMedia)(({ theme }) => ({
  height: 400,
  width: 300,
  position: "relative",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(0.9)",
  },
}));

const BookDetailsPage = ({ books, handleAddToCartrent }) => {
  // const cartItems = useSelector((state) => state.cart.cartItems);
  // console.log("carttbook details", cartItems);
  const { bookId } = useParams();
  const book = books.find((book) => book._id === bookId);
  const [comments, setComments] = useState([
    { id: 1, text: "This book is amazing!" },
    { id: 2, text: "I really enjoyed reading it." },
  ]);
  const [newComment, setNewComment] = useState("");

  // Function to handle comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      // Create a new comment object with a unique id
      const comment = { id: comments.length + 1, text: newComment };

      // Add the new comment to the comments list
      setComments([...comments, comment]);

      // Clear the input field
      setNewComment("");
    }
  };

  if (!bookId) {
    return <div>Book ID not provided.</div>;
  }

  if (!book) {
    return <div>Book not found.</div>;
  }

  // Calculate star width based on rating
  const maxRating = 5;
  const starRating = parseFloat(book.Rating.$numberDecimal) * (maxRating / 10);
  const fullStars = Math.floor(starRating);
  const remainingStars = starRating - fullStars;
  const hasHalfStar = remainingStars >= 0.25 && remainingStars < 0.75;

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Book details
      </Typography>

      <Container>
        <div className="bookdetails-card-componenet">
          <div className="product-image">
            <Media image={book.imagelink} title={book.title} />
          </div>

          <div className="product-details">
            <CardContent className="cardcontent-book-details">
              <Typography
                className="booktit"
                variant="h5"
                gutterBottom
                style={{ textAlign: "left" }}
              >
                <span
                  style={{
                    fontStyle: "italic",
                    fontWeight: "bold",
                    color: "#BB2525",
                  }}
                >
                  {book.title}
                </span>
              </Typography>

              <Typography
                className="autitle"
                variant="subtitle1"
                gutterBottom
                style={{ textAlign: "left" }}
              >
                <span style={{ fontWeight: "bold", color: "#BB2525" }}>
                  Author:{" "}
                </span>
                {book.author}
              </Typography>

              <Typography
                // variant="subtitle1"
                paragraph
                sx={{ textAlign: "justify" }}
                className="bookdetails-para"
              >
                <span style={{ fontWeight: "bold", color: "#BB2525" }}>
                  About the book:
                </span>{" "}
                {book.description}
              </Typography>

              <div className="product-rating">
                {starRating.toFixed(1)}:
                {Array.from({ length: fullStars }, (_, index) => (
                  <StarIcon key={index} className="staric" />
                ))}
                {hasHalfStar && <StarHalfIcon className="staric" />}
              </div>
              <div>
                <h3>Comments</h3>
                <List>
                  {comments.map((comment) => (
                    <React.Fragment key={comment.id}>
                      <ListItem>
                        <ListItemText primary={comment.text} />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <TextField
                    label="Write a comment"
                    variant="outlined"
                    fullWidth
                    multiline
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    style={{ marginRight: "10px" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<SendIcon />}
                    onClick={handleCommentSubmit}
                  >
                    Send
                  </Button>
                </div>
              </div>
              <div className="product-price">
                <Typography variant="h5" color="error">
                  Rs: {book.price}
                </Typography>
              </div>

              <div className="btn-shop-book-book-details">
                <Button
                  variant="contained"
                  color="error"
                  className="Btn-Buy-shop-book-details"
                  onClick={() => handleAddToCartrent(book)}
                >
                  Add Cart
                </Button>

                <Button
                  className="Btn-Buy-rent-book-details"
                  variant="outlined"
                  color="error"
                  onClick={() => handleAddToCartrent(book, true)}
                >
                  Rent
                </Button>
              </div>
            </CardContent>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BookDetailsPage;
