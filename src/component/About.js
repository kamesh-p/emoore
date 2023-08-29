import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Card, CardActionArea, CardMedia, CardContent } from "@mui/material";
import axios from "axios";
import Footer from "./Footer";
import "./About.css";
import { useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Shop from "./Shop";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Dashboard from "./Admin/Dashboard";
import HomePage from "./Home";

const About = ({ addToCart, cartItems, books, handleAddToCartrent }) => {
  const [booksState, setBooksState] = useState([]);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const [selectedBook, setSelectedBook] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [preference, setprederence] = useState([]);
  const [booksStateShop, setBooksStateshop] = useState([]);
  const [booksStatebookshop, setBooksStatebookshop] = useState([]);
  const [selectedBookshop, setSelectedBookshop] = useState(null);
  const [dialogshop, setDialogshop] = useState(false);
  const [searchQueryshop, setSearchQueryshop] = useState("");
  const [showProductsshop, setShowProductsshop] = useState(false);

  const handleClose = () => {
    setDialogshop(false);
  };

  const handleSearch = () => {
    if (searchQueryshop === "") {
      setBooksStateshop([]);
      setBooksStatebookshop([]);
    } else {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchQueryshop.toLowerCase())
      );

      setBooksStateshop(filteredBooks);
      setBooksStatebookshop(
        filteredBooks.filter(
          (book) => book.title.toLowerCase() === searchQueryshop.toLowerCase()
        )
      );
    }
    setShowProductsshop(true);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQueryshop(query);

    handleSearch(query);
  };

  const handleBookClick = (bookTitle) => {
    setSearchQueryshop(bookTitle);

    handleSearch(bookTitle);
  };

  const isAdmin = user?.Users?.Type === "Admin";

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/users/");
      setprederence(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  console.log("pro", preference);
  const idArray = preference.map((pre) => pre._id);

  console.log("preo pre id", idArray);

  let matchingPreference = null;

  if (user && user.Users && user.Users._id) {
    matchingPreference = preference.find((pre) => pre._id === user.Users._id);
  }
  console.log("match found", matchingPreference);
  // console.log("match found", matchingPreference.genre[0]);
  // console.log("match found", matchingPreference.language[0]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const LanguageTotalBooks = booksState.filter(
    (book) => book.classification === "Language"
  );
  const GenreTotalBooks = booksState.filter(
    (book) => book.classification === "Genre"
  );
  const EducationTotalBooks = booksState.filter(
    (book) => book.classification === "Education"
  );
  const EducationsortedBooks = EducationTotalBooks.sort((a, b) => {
    const ratingA =
      a.Rating && a.Rating["$numberDecimal"]
        ? parseFloat(a.Rating["$numberDecimal"])
        : 0;
    const ratingB =
      b.Rating && b.Rating["$numberDecimal"]
        ? parseFloat(b.Rating["$numberDecimal"])
        : 0;
    return ratingB - ratingA;
  });
  const GenresortedBooks = GenreTotalBooks.sort((a, b) => {
    const ratingA =
      a.Rating && a.Rating["$numberDecimal"]
        ? parseFloat(a.Rating["$numberDecimal"])
        : 0;
    const ratingB =
      b.Rating && b.Rating["$numberDecimal"]
        ? parseFloat(b.Rating["$numberDecimal"])
        : 0;
    return ratingB - ratingA;
  });
  const LangsortedBooks = LanguageTotalBooks.sort((a, b) => {
    const ratingA =
      a.Rating && a.Rating["$numberDecimal"]
        ? parseFloat(a.Rating["$numberDecimal"])
        : 0;
    const ratingB =
      b.Rating && b.Rating["$numberDecimal"]
        ? parseFloat(b.Rating["$numberDecimal"])
        : 0;
    return ratingB - ratingA;
  });
  const topratedEducation = EducationsortedBooks.slice(0, 4);
  const topratedLang = LangsortedBooks.slice(0, 4);
  const topratedgenre = GenresortedBooks.slice(0, 4);

  console.log("Sorted Books education:", topratedEducation);
  console.log("Sorted Books Genre:", topratedgenre);
  console.log("Sorted Books Lang:", topratedLang);

  const educationBooks = matchingPreference
    ? EducationsortedBooks.filter(
        (book) => book.Education === matchingPreference.education
      )
    : [];

  const genreBooks = matchingPreference
    ? GenresortedBooks.filter(
        (book) =>
          book.Genre === matchingPreference.genre[0] &&
          book.language === matchingPreference.language[0]
      )
    : [];
  const languageBooks = matchingPreference
    ? LangsortedBooks.filter(
        (book) => book.language === matchingPreference.language[0]
      )
    : [];
  const toppreferenecelanguage = languageBooks.slice(0, 4);
  console.log("topppppppppplllll", toppreferenecelanguage);
  const toppreferenecegenre = genreBooks.slice(0, 4);
  console.log("toppppppppppggggg", toppreferenecegenre);
  const topprefereneceEducation = educationBooks.slice(0, 4);
  console.log("toppppppppppeeeee", topprefereneceEducation);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  let Loginname = "Viewers";

  if (isAuthenticated && user) {
    Loginname = user.Users.name;
  }
  useEffect(() => {
    setBooksState(books);
  }, [books]);
  const settings = {
    infinite: true,
    speed: 1200,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
  };
  // const settingss = {
  //   infinite: true,
  //   speed: 1200,
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 1000,
  // };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  console.log("app", cartItems);
  console.log("bookstate", booksState);

  return (
    <div className="full-about-componenet">
      {/* <Book /> */}
      <div className="About-full-container">
        {/* <Container maxWidth="md" className="root">
          <div className="container-intro">
            <div className="container-content">
              <Typography variant="h6" className="title" gutterBottom>
                Welcome {Loginname},
              </Typography>
              <Typography variant="h6" className="subtitle" gutterBottom>
                Welcome to our Moore Market E-commerce Website, your one-stop
                destination for finding pre-loved literary treasures. Our
                platform is dedicated to connecting book lovers with a vast
                selection of quality used books, each with its own unique
                history and charm.
              </Typography>
            </div>
          </div>
        </Container>

        <div className="item-features">
          <Typography className="item-features-text" variant="h5">
            Features Available
          </Typography>
          <Slider {...settings}>
            <div>
              <Item id="Item-container1" className="Item-container">
                <div className="Item-container-content">
                  <img
                    src="data:image/png;base64,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"
                    alt="s"
                    className="img-item-container"
                  />
                  Books are the keys to wisdom's treasure trove, so invest in
                  them and watch your knowledge grow.
                </div>
                <div>
                  <Button
                    className="Item-container-btn"
                    color="success"
                    size="medium"
                    variant="contained"
                    href="/Buy"
                  >
                    Buy
                  </Button>
                </div>
              </Item>
            </div>
            <div>
              <Item id="Item-container2" className="Item-container">
                <div className="Item-container-content">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoJJl-p9S5aPwUqVTeoX7igrxJzqvcMlw6Ow&usqp=CAU"
                    alt="s"
                    className="img-item-container"
                  />
                  "Unlock the wisdom within these pages, and share its magic
                  with a new owner. Own your knowledge, sell your book
                </div>
                <div>
                  <Button
                    className="Item-container-btn"
                    color="error"
                    size="medium"
                    variant="contained"
                    href="/Sell"
                  >
                    Sell
                  </Button>
                </div>
              </Item>
            </div>
            <div>
              <Item id="Item-container3" className="Item-container">
                <div className="Item-container-content">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjad3BqRwwfHUCgmJyicipj60db7gmWUas_YIFpzaUFZ0LO38T4p2dihWt3Nc2BkOxwP0&usqp=CAU"
                    alt="s"
                    className="img-item-container"
                  />
                  "Embark on an adventure without owning it forever. Rent a
                  book, discover new worlds, and return it enriched."
                </div>
                <div>
                  <Button
                    className="Item-container-btn"
                    color="info"
                    size="medium"
                    variant="contained"
                    href="/Library"
                  >
                    Rent
                  </Button>
                </div>
              </Item>
            </div>
            <div>
              <Item id="Item-container4" className="Item-container">
                <div className="Item-container-content">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnN-iMCom3ENlbqJYFpz7YZDTzr4PvMCpVV4aU6k9omzxyu6bjvBLeOM8aR09aJWvAzFU&usqp=CAU"
                    alt="s"
                    className="img-item-container"
                  />
                  "Cash on Delivery: Pay with ease when your literary treasures
                  arrive at your door. Discover the joy of reading without any
                  hassle!"
                </div>
                <div>
                  <Button
                    className="Item-container-btn"
                    color="secondary"
                    size="medium"
                    variant="contained"
                  >
                    Cash
                  </Button>
                </div>
              </Item>
            </div>
          </Slider>
        </div> */}
        {/* <Shop /> */}

        {!isAdmin && (
          <div className="search-bar-total-full-contaner">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQueryshop}
                onChange={handleInputChange}
                className="input-search-about-componenet"
              />
              <Button
                className="btn-search-bar-search"
                variant="contained"
                color="error"
                onClick={() => {
                  handleSearch();
                  setShowProductsshop(false);
                }}
              >
                <SearchIcon />
              </Button>
            </div>
            {showProductsshop && (
              <div className="book-suggested-list-container">
                <div
                  className={`book-list-container ${
                    showProductsshop ? "" : "hide-book-list"
                  }`}
                  style={{
                    maxHeight: "300px", // Adjust the height as needed
                    overflowY: "auto",
                  }}
                >
                  {booksStateShop.slice(0, 4).map((book, index) => (
                    <Link
                      className="link-shop-comp-contanin"
                      to={{ pathname: `/book/${book._id}`, state: { book } }}
                    >
                      <p
                        key={index}
                        className="book-result"
                        onClick={() => handleBookClick(book.title)}
                      >
                        {book.title}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <HomePage />

            <Dialog open={dialogshop} onClose={handleClose}>
              <DialogTitle>Book Description</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {selectedBookshop?.description}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
        {isAdmin && (
          <div>
            <Dashboard />
          </div>
        )}
        {isAuthenticated &&
          matchingPreference &&
          matchingPreference.education === "" && (
            <>
              <div className="scroll-background">
                <p variant="h5" component="h6" className="Favarite-title">
                  Top Rated Education
                </p>
              </div>
              <div className="Cart-book-shop-search">
                {topratedEducation.map((book, index) => (
                  <Link
                    className="link-shop-comp-contanin"
                    to={{ pathname: `/book/${book._id}`, state: { book } }}
                  >
                    <Card
                      key={index}
                      sx={{ maxWidth: 345 }}
                      className="Card-indiv-book-search-about"
                    >
                      <CardActionArea className="container-about-content-detail">
                        <CardMedia
                          component="img"
                          height="140"
                          image={book.imagelink}
                          alt={book.title}
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

                      <div className="btn-container-About">
                        <Button
                          size="small"
                          color="info"
                          className="Btn-ViewMore-btn"
                          onClick={() => {
                            setSelectedBookshop(book);

                            setDialogshop(true);
                          }}
                        >
                          View More
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        {isAuthenticated &&
          matchingPreference &&
          matchingPreference.genre[0] === "" && (
            <>
              <div className="scroll-background">
                <p variant="h5" component="h6" className="Favarite-title">
                  Top Rated Genre
                </p>
              </div>
              <div className="Cart-book-shop-search">
                {topratedgenre.map((book, index) => (
                  <Link
                    className="link-shop-comp-contanin"
                    to={{ pathname: `/book/${book._id}`, state: { book } }}
                  >
                    <Card
                      key={index}
                      sx={{ maxWidth: 345 }}
                      className="Card-indiv-book-search-about"
                    >
                      <CardActionArea className="container-about-content-detail">
                        <CardMedia
                          component="img"
                          height="140"
                          image={book.imagelink}
                          alt={book.title}
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

                      <div className="btn-container-About">
                        <Button
                          size="small"
                          color="info"
                          className="Btn-ViewMore-btn"
                          onClick={() => {
                            setSelectedBookshop(book);

                            setDialogshop(true);
                          }}
                        >
                          View More
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        {isAuthenticated &&
          matchingPreference &&
          matchingPreference.language[0] === "" && (
            <>
              <div className="scroll-background">
                <p variant="h5" component="h6" className="Favarite-title">
                  Top Rated Language
                </p>
              </div>
              <div className="Cart-book-shop-search">
                {topratedLang.map((book, index) => (
                  <Link
                    className="link-shop-comp-contanin"
                    to={{ pathname: `/book/${book._id}`, state: { book } }}
                  >
                    <Card
                      key={index}
                      sx={{ maxWidth: 345 }}
                      className="Card-indiv-book-search-about"
                    >
                      <CardActionArea className="container-about-content-detail">
                        <CardMedia
                          component="img"
                          height="140"
                          image={book.imagelink}
                          alt={book.title}
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

                      <div className="btn-container-About">
                        <Button
                          size="small"
                          color="info"
                          className="Btn-ViewMore-btn"
                          onClick={() => {
                            setSelectedBookshop(book);

                            setDialogshop(true);
                          }}
                        >
                          View More
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </>
          )}
        {!isAdmin && isAuthenticated && toppreferenecelanguage.length > 0 && (
          <>
            <div className="scroll-background">
              <p variant="h5" component="h6" className="Favarite-title">
                Your Language preference
              </p>
            </div>
            <div className="Cart-book-shop-search">
              {toppreferenecelanguage.map((book, index) => (
                <Link
                  className="link-shop-comp-contanin"
                  to={{ pathname: `/book/${book._id}`, state: { book } }}
                >
                  <Card
                    key={index}
                    sx={{ maxWidth: 345 }}
                    className="Card-indiv-book-search-about"
                  >
                    <CardActionArea className="container-about-content-detail">
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.imagelink}
                        alt={book.title}
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

                    <div className="btn-container-About">
                      <Button
                        size="small"
                        color="info"
                        className="Btn-ViewMore-btn"
                        onClick={() => {
                          setSelectedBookshop(book);

                          setDialogshop(true);
                        }}
                      >
                        View More
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
        {!isAuthenticated && !user && (
          <>
            <div className="scroll-background">
              <p variant="h5" component="h6" className="Favarite-title">
                Top Rated Language
              </p>
            </div>
            <div className="Cart-book-shop-search">
              {topratedLang.map((book, index) => (
                <Link
                  className="link-shop-comp-contanin"
                  to={{ pathname: `/book/${book._id}`, state: { book } }}
                >
                  <Card
                    key={index}
                    sx={{ maxWidth: 345 }}
                    className="Card-indiv-book-search-about"
                  >
                    <CardActionArea className="container-about-content-detail">
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.imagelink}
                        alt={book.title}
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

                    <div className="btn-container-About">
                      <Button
                        size="small"
                        color="info"
                        className="Btn-ViewMore-btn"
                        onClick={() => {
                          setSelectedBookshop(book);

                          setDialogshop(true);
                        }}
                      >
                        View More
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
        {!isAuthenticated && !user && (
          <>
            <div className="scroll-background">
              <p variant="h5" component="h6" className="Favarite-title">
                Top Rated Genre
              </p>
            </div>
            <div className="Cart-book-shop-search">
              {topratedgenre.map((book, index) => (
                <Link
                  className="link-shop-comp-contanin-about"
                  to={{ pathname: `/book/${book._id}`, state: { book } }}
                >
                  <Card
                    key={index}
                    sx={{ maxWidth: 345 }}
                    className="Card-indiv-book-search-about"
                  >
                    <CardActionArea className="container-about-content-detail">
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.imagelink}
                        alt={book.title}
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

                    <div className="btn-container-About">
                      <Button
                        size="small"
                        color="info"
                        className="Btn-ViewMore-btn"
                        onClick={() => {
                          setSelectedBookshop(book);

                          setDialogshop(true);
                        }}
                      >
                        View More
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
        {!isAuthenticated && !user && (
          <>
            <div className="scroll-background">
              <p variant="h5" component="h6" className="Favarite-title">
                Top Rated Education
              </p>
            </div>
            <div className="Cart-book-shop-search">
              {topratedEducation.map((book, index) => (
                <Link
                  className="link-shop-comp-contanin"
                  to={{ pathname: `/book/${book._id}`, state: { book } }}
                >
                  <Card
                    key={index}
                    sx={{ maxWidth: 345 }}
                    className="Card-indiv-book-search-about"
                  >
                    <CardActionArea className="container-about-content-detail">
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.imagelink}
                        alt={book.title}
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

                    <div className="btn-container-About">
                      <Button
                        size="small"
                        color="info"
                        className="Btn-ViewMore-btn"
                        onClick={() => {
                          setSelectedBookshop(book);

                          setDialogshop(true);
                        }}
                      >
                        View More
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
        {isAuthenticated && toppreferenecegenre.length > 0 && !isAdmin && (
          <>
            <div className="scroll-background">
              <p variant="h5" component="h6" className="Favarite-title">
                Your Genre Book
              </p>
            </div>
            <div className="Cart-book-shop-search">
              {toppreferenecegenre.map((book, index) => (
                <Link
                  className="link-shop-comp-contanin"
                  to={{ pathname: `/book/${book._id}`, state: { book } }}
                >
                  <Card
                    key={index}
                    sx={{ maxWidth: 345 }}
                    className="Card-indiv-book-search-about"
                  >
                    <CardActionArea className="container-about-content-detail">
                      <CardMedia
                        className="cardaction-book-img"
                        component="img"
                        height="140"
                        image={book.imagelink}
                        alt={book.title}
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

                    <div className="btn-container-About">
                      <Button
                        size="small"
                        color="info"
                        className="Btn-ViewMore-btn"
                        onClick={() => {
                          setSelectedBookshop(book);

                          setDialogshop(true);
                        }}
                      >
                        View More
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}

        {isAuthenticated && topprefereneceEducation.length > 0 && !isAdmin && (
          <>
            <div className="scroll-background">
              <p variant="h5" component="h6" className="Favarite-title">
                Your Education preference
              </p>
            </div>
            <div className="Cart-book-shop-search">
              {topprefereneceEducation.map((book, index) => (
                <Link
                  className="link-shop-comp-contanin"
                  to={{ pathname: `/book/${book._id}`, state: { book } }}
                >
                  <Card
                    key={index}
                    sx={{ maxWidth: 345 }}
                    className="Card-indiv-book-search-about"
                  >
                    <CardActionArea className="container-about-content-detail">
                      <CardMedia
                        component="img"
                        height="140"
                        image={book.imagelink}
                        alt={book.title}
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

                    <div className="btn-container-About">
                      <Button
                        size="small"
                        color="info"
                        className="Btn-ViewMore-btn"
                        onClick={() => {
                          setSelectedBookshop(book);

                          setDialogshop(true);
                        }}
                      >
                        View More
                      </Button>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      {!isAdmin && <Footer />}
    </div>
  );
};
export default About;
