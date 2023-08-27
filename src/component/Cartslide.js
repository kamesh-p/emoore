import React, { useState } from "react";
import "./Cartslide.css";
const Sidebar = () => {
  const book = {
    name: "Book Name",

    disc: "Rs 400",

    img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.bookstantra.com%2Fwp-content%2Fuploads%2F2018%2F07%2F9788177395020-510x765.jpg&f=1&nofb=1&ipt=ed18d42eb67e86d4ce34b2d793f21b76d72e0c3add60748df23f17157130834e&ipo=images",
  };

  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div className="nav-bar-slide-cart">
        <button className="hamburger" onClick={handleToggle}>
          Cart
        </button>
      </div>

      <div className={`sidebar ${expanded ? "expanded" : ""}`}>
        <div className="contentslide-cart">
          <div className="cart-cardslide-cart">
            <div className="cart-item-containerslide-cart">
              <img src={book.img} alt="book img"></img>

              <h3>{book.name}</h3>

              <p>{book.disc}</p>

              <button>Buy</button>
            </div>
          </div>

          <div className="cart-cardslide-cart">
            <div className="cart-item-containerslide-cart">
              <img src={book.img} alt="book img"></img>

              <h3>{book.name}</h3>

              <p>{book.disc}</p>

              <button>Buy</button>
            </div>
          </div>

          <div className="cart-cardslide-cart">
            <div className="cart-item-containerslide-cart">
              <img src={book.img} alt="book img"></img>

              <h3>{book.name}</h3>

              <p>{book.disc}</p>

              <button>Buy</button>
            </div>
          </div>

          <button>Proceed to Checkout</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
