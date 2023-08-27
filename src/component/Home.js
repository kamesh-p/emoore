import React, { useEffect, useState } from "react";

import "./Home.css";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

const HomePage = () => {
  const [carthistory, setCarthistory] = useState([]);
  const [OrderedBooks, setTopOrderedBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/orders")
      .then((response) => response.json())
      .then((data) => setCarthistory(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  console.log("carthistory", carthistory);
  useEffect(() => {
    const bookTitleFrequency = {};

    carthistory.forEach((order) => {
      order.items.forEach((item) => {
        const title = item.title;

        if (title in bookTitleFrequency) {
          bookTitleFrequency[title]++;
        } else {
          bookTitleFrequency[title] = 1;
        }
      });
    });

    const sortedBookTitles = Object.keys(bookTitleFrequency).sort(
      (a, b) => bookTitleFrequency[b] - bookTitleFrequency[a]
    );

    const topOrderedBooks = sortedBookTitles.slice(0, 5);
    setTopOrderedBooks(topOrderedBooks);
  }, [carthistory]);
  console.log("topbook", OrderedBooks);
  return (
    <div className="homepage">
      <div className="category-container">
        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n2.sdlcdn.com/imgs/e/h/m/Fiction-0ba2f.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">Fiction</p>
            </div>
          </div>
        </a>

        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n2.sdlcdn.com/imgs/e/h/m/NonFiction-3fef2.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">Non-Fiction</p>
            </div>
          </div>
        </a>

        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n3.sdlcdn.com/imgs/e/h/m/competitive-40931.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">Education</p>
            </div>
          </div>
        </a>

        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n3.sdlcdn.com/imgs/e/h/m/academic-8196a.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">Engineering</p>
            </div>
          </div>
        </a>

        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n3.sdlcdn.com/imgs/e/h/m/children-7d2df.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">Medical</p>
            </div>
          </div>
        </a>

        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n4.sdlcdn.com/imgs/e/h/m/religious-9f3e5.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">Religious</p>
            </div>
          </div>
        </a>

        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n4.sdlcdn.com/imgs/e/h/m/philosphy-ed2c5.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">Philosphy</p>
            </div>
          </div>
        </a>

        <a>
          <div className="category">
            <div className="categoryInner">
              <img
                src="https://n1.sdlcdn.com/imgs/e/h/m/school-4790f.jpg"
                alt="Fiction"
              ></img>

              <p className="category-text">School</p>
            </div>
          </div>
        </a>
      </div>

      <div className="carousel-container">
        <div className="trending-section">
          <Typography variant="h6">Top Five Ordered Books</Typography>
          <List>
            {OrderedBooks.map((bookTitle, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={
                    bookTitle.length > 20
                      ? `${bookTitle.slice(0, 17)}...`
                      : bookTitle
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>

        <div className="carousel-section"></div>
      </div>

      <section className="books-scroll-section">
        {/* <div className="books-scroll-section-header">
          <p>Combo's for every Book Reader</p>

          <button>View All Books</button>
        </div> */}

        {/* <div className="books-scroll-view">
          <div className="books-card">
            <div id="large-th">
              <div class="container">
                <h1> A list of books</h1>

                <br />

                <div>
                  <div class="book read">
                    <div class="cover">
                      <img src="https://alysbcohen.files.wordpress.com/2015/01/little-princess-book-cover.jpg" />
                    </div>

                    <div class="description">
                      <p class="title">
                        A Little Princess
                        <br />
                        <span class="author">Frances Hodgson Burnett</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default HomePage;
