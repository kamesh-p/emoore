import React, { useEffect, useState } from "react";

import "./Shop.css";
import {
  Card,
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import SchoolIcon from "@mui/icons-material/School";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
const Shop = ({ books, handleAddToCartrent }) => {
  const [booksState, setBooksState] = useState([]);
  const [selectedBookshop, setSelectedBookshop] = useState(null);
  const [dialogshop, setDialogshop] = useState(false);

  const handleClose = () => {
    setDialogshop(false);
  };

  useEffect(() => {
    setBooksState(books);
  }, [books]);
  console.log("book", booksState);
  const sortedBooks = booksState
    .filter((book) => book.Rating && book.Rating["$numberDecimal"])
    .sort((a, b) => {
      const ratingA = parseFloat(a.Rating["$numberDecimal"]);
      const ratingB = parseFloat(b.Rating["$numberDecimal"]);
      return ratingB - ratingA;
    });
  const [selectedCategory, setSelectedCategory] = useState(sortedBooks);
  const LanguageTotalBooks = booksState.filter(
    (book) => book.classification === "Language"
  );
  const GenreTotalBooks = booksState.filter(
    (book) => book.classification === "Genre"
  );
  const EducationTotalBooks = booksState.filter(
    (book) => book.classification === "Education"
  );
  const EnglishTotalBooks = LanguageTotalBooks.filter(
    (book) => book.language === "English"
  );
  const TamilTotalBooks = LanguageTotalBooks.filter(
    (book) => book.language === "Tamil"
  );
  const MedicalTotalBooks = EducationTotalBooks.filter(
    (book) => book.Education === "Medicine"
  );
  const EngineeringTotalBooks = EducationTotalBooks.filter(
    (book) => book.Education === "Engineering"
  );
  const FictionTotalBooks = GenreTotalBooks.filter(
    (book) => book.Genre === "fictional"
  );
  const NonFictionTotalBooks = GenreTotalBooks.filter(
    (book) => book.Genre === "Non-fictional"
  );
  const ThrillerTotalBooks = GenreTotalBooks.filter(
    (book) => book.Genre === "Thriller"
  );
  console.log("rryytt", NonFictionTotalBooks);

  const toptwentyratedbooks = sortedBooks.slice(0, 12);

  const selectedBooks = (() => {
    switch (selectedCategory) {
      case "Language":
        return LanguageTotalBooks;
      case "Genre":
        return GenreTotalBooks;
      case "Education":
        return EducationTotalBooks;
      case "English":
        return EnglishTotalBooks;
      case "Tamil":
        return TamilTotalBooks;
      case "Medicine":
        return MedicalTotalBooks;
      case "Engineering":
        return EngineeringTotalBooks;
      case "fictional":
        return FictionTotalBooks;
      case "Non-fictional":
        return NonFictionTotalBooks;
      case "Thriller":
        return ThrillerTotalBooks;
      default:
        return toptwentyratedbooks;
    }
  })();
  console.log("new-shop", sortedBooks);
  console.log("top20", toptwentyratedbooks);
  return (
    <div className="shop-slide-full-container">
      <Drawer
        className="drawer-full-contained"
        variant="permanent"
        anchor="left"
      >
        <div>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ pt: 2 }}
            className="typo-drawer"
          >
            Categories
          </Typography>
        </div>
        <List>
          {/* Language */}
          <ListItem button onClick={() => setSelectedCategory("Language")}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItem>

          {/* Genre */}
          <ListItem button onClick={() => setSelectedCategory("Genre")}>
            <ListItemIcon>
              <AutoStoriesOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Genre" />
          </ListItem>

          {/* Education */}
          <ListItem button onClick={() => setSelectedCategory("Education")}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Education" />
          </ListItem>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ pt: 2 }}
            className="typo-drawer"
          >
            Language
          </Typography>
          <ListItem button onClick={() => setSelectedCategory("English")}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="English" />
          </ListItem>

          <ListItem button onClick={() => setSelectedCategory("Tamil")}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Tamil" />
          </ListItem>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ pt: 2 }}
            className="typo-drawer"
          >
            Education
          </Typography>
          <ListItem button onClick={() => setSelectedCategory("Medicine")}>
            <ListItemIcon>
              <MedicalServicesOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Medical" />
          </ListItem>

          <ListItem button onClick={() => setSelectedCategory("Engineering")}>
            <ListItemIcon>
              <EngineeringOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Engineering" />
          </ListItem>
          <Typography
            variant="h6"
            component="div"
            align="center"
            sx={{ pt: 2 }}
            className="typo-drawer"
          >
            Genre
          </Typography>
          <ListItem button onClick={() => setSelectedCategory("fictional")}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="fictional" />
          </ListItem>

          <ListItem button onClick={() => setSelectedCategory("Non-fictional")}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Non-fictional" />
          </ListItem>
        </List>

        {/* ... Other ListItems ... */}
      </Drawer>

      {/* <div className="sidebar-Shop-sidebar">
        <h2>Categories</h2>

        <div className="category-Shop-sidebar">
          <ul>
            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Language")}
            >
              <LanguageIcon className="sidebar-icon" />
              Language
            </li>

            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Genre")}
            >
              <AutoStoriesOutlinedIcon className="sidebar-icon" />
              Genre
            </li>

            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Education")}
            >
              <SchoolIcon className="sidebar-icon" />
              Education
            </li>
          </ul>
        </div>

        <div className="category-Shop-sidebar">
          <h3>Language</h3>

          <ul>
            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("English")}
            >
              English
            </li>

            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Tamil")}
            >
              Tamil
            </li>

            <li className="Shop-sidebar-li">Hindi</li>

            <li className="Shop-sidebar-li">French</li>
          </ul>
        </div>

        <div className="category-Shop-sidebar">
          <h3>Genre</h3>

          <ul>
            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("fictional")}
            >
              Fictional
            </li>

            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Non-fictional")}
            >
              Non-Fiction
            </li>

            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Thriller")}
            >
              Thriller
            </li>
            <li className="Shop-sidebar-li">Romance</li>
            <li className="Shop-sidebar-li">Horror</li>
          </ul>
        </div>
        <div className="category-Shop-sidebar">
          <h3>
            <SchoolIcon className="sidebar-icon" />
            Education
          </h3>

          <ul>
            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Medicine")}
            >
              <MedicalServicesOutlinedIcon className="sidebar-icon" />
              Medicine
            </li>

            <li
              className="Shop-sidebar-li"
              onClick={() => setSelectedCategory("Engineering")}
            >
              <EngineeringOutlinedIcon className="sidebar-icon" />
              Engineering
            </li>
          </ul>
        </div>
      </div> */}
      <div className="books-container-shop-comp">
        {selectedBooks.map((book, index) => (
          <Link
            className="link-shop-comp-contanin"
            to={{ pathname: `/book/${book._id}`, state: { book } }}
          >
            <Card key={index} className="Card-indiv-book-search-shop">
              <CardActionArea className="container-about-content-detail">
                <CardMedia
                  component="img"
                  height="140"
                  image={book.imagelink}
                  alt={book.title}
                  className="img-shop-book-container"
                />

                <CardContent className="CardContent-details">
                  <Typography
                    gutterBottom
                    variant="p"
                    component="div"
                    className="CardContent-title"
                  >
                    {book.title}
                  </Typography>
                </CardContent>
              </CardActionArea>

              {/* <div className="btn-container-About">
                <Button
                  size="small"
                  color="info"
                  className="Btn-ViewMore"
                  onClick={() => {
                    setSelectedBookshop(book);

                    setDialogshop(true);
                  }}
                >
                  View More
                </Button>

                <div className="btn-shop-book">
                  <Button
                    size="small"
                    variant="contained"
                    color="info"
                    className="Btn-Buy-shop"
                    onClick={() => handleAddToCartrent(book)}
                  >
                    Buy
                  </Button>

                  <Button
                    className="Btn-Buy-rent"
                    variant="contained"
                    color="error"
                    onClick={() => handleAddToCartrent(book, true)}
                  >
                    Rent
                  </Button>
                </div>
              </div> */}
            </Card>
          </Link>
        ))}
      </div>
      <Dialog open={dialogshop} onClose={handleClose}>
        <DialogTitle>Book Description</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedBookshop?.description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Shop;
