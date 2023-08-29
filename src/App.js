import "./App.css";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import Example from "./Example";
import Cart from "./component/Cart";
import About from "./component/About";
import "bootstrap/dist/css/bootstrap.css";
import BookDetailsPage from "./component/Bookdetails";
import Header from "./component/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Shop from "./component/Shop";
import Sell from "./component/Sell";
import Library from "./component/Library";
import Login from "./component/Login";
import SignupPage from "./component/Signup";
import { toast } from "react-toastify";
import UserDetail from "./component/Admin/UserDetail";
import DialogBox from "./component/Genre";
import AdminDashboard from "./component/Admin/AdminDash";
import SellDetails from "./component/SellDetails";
import History from "./component/History";
import Profile from "./component/Tabs";
import Footer from "./component/Footer";
import Sidebar from "./component/Cartslide";
import CartHisandRent from "./component/CartHisandRentHis";
import AdminTabs from "./component/Admin/AdminTabs";
import Adminuser from "./component/Admin/Adminuser";

// Adjust the path
function App() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return storedCartItems;
  });

  const [books, setBooks] = useState([]);
  const [booksState, setBooksState] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);

  const user = useSelector((state) => state.auth.user);
  const handleAddToCartandRent = (book, isRented = false) => {
    setBooksState((prevBooks) =>
      prevBooks.map((prevBook) =>
        prevBook.id === book.id
          ? { ...prevBook, addedToCart: true, rented: isRented }
          : prevBook
      )
    );

    if (isRented) {
      setRentedBooks((prevRentedBooks) => [...prevRentedBooks, book]);
    } else {
      addToCart(book);
    }
  };

  useEffect(() => {
    fetch("http://localhost:4000/books")
      .then((response) => response.json())

      .then((data) => setBooks(data))

      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const addToCart = (book) => {
    const existingCartItemIndex = cartItems.findIndex(
      (item) => item._id === book._id
    );

    if (existingCartItemIndex !== -1) {
      // Book already exists in the cart, increase the quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingCartItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Book doesn't exist in the cart, add a new entry
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...book, quantity: 1 },
      ]);
    }

    toast.success("Item added to cart...", {
      autoClose: 1000,
      position: "top-right",
    });
  };

  const handleRemoveItem = (index) => {
    toast.error("Item removed from cart...", {
      autoClose: 1000,
      position: "top-right",
    });
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };
  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  const handleDeleteBook = (bookId) => {
    toast.error("Item removed from cart...", {
      autoClose: 1000,
      position: "top-right",
    });
    // Create a confirmation dialog before deleting the book

    const isConfirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (isConfirmed) {
      // Remove the book from the rentedBooks array
      setRentedBooks((prevRentedBooks) =>
        prevRentedBooks.filter((book) => book._id !== bookId)
      );
    }
  };

  // cart

  let length = cartItems.length;
  let rentcount = rentedBooks.length;
  return (
    <Router>
      <div className="App">
        <Header length={length} count={rentcount} />

        <Routes>
          <Route
            path="/about"
            element={
              <About
                addToCart={addToCart}
                cartItems={cartItems}
                books={books}
                handleAddToCartrent={handleAddToCartandRent}
              />
            }
          />

          <Route
            path="/Library"
            element={
              <Library
                rentedBooks={rentedBooks}
                onDeleteBook={handleDeleteBook}
              />
            }
          />
          <Route
            path="/Buy"
            element={
              <Shop
                books={books}
                addToCart={addToCart}
                handleAddToCartrent={handleAddToCartandRent}
                rentedBooks={rentedBooks}
              />
            }
          />
          {/* <Route
            path="/Cart"
            element={
              // <Cart cartItems={cartItems} handleRemoveItem={handleRemoveItem} />
              <Cart />
            }
          /> */}

          <Route path="/Sell" element={<Sell books={books} />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<SignupPage />} />
          <Route path="/Genre" element={<DialogBox />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route
            path="/book/:bookId"
            element={
              <BookDetailsPage
                books={books}
                handleAddToCartrent={handleAddToCartandRent}
              />
            }
          />
          <Route path="/sell-admin" element={<SellDetails />} />
          <Route path="/history" element={<History />} />
          <Route
            path="/Cart"
            element={
              <Profile
                cartItems={cartItems}
                setCartItems={setCartItems}
                handleRemoveItem={handleRemoveItem}
                rentedBooks={rentedBooks}
                onDeleteBook={handleDeleteBook}
              />
            }
          />
          <Route path="/CRhistory" element={<CartHisandRent />} />
          <Route path="/Admindetails" element={<AdminTabs />} />
          <Route path="/AdminUser" element={<Adminuser />} />
          <Route path="/user/:userId" element={<UserDetail />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
