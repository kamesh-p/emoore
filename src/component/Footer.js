import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p></p>
        </div>
        <div className="footer-section" id="footer-section">
          <h3>Connect with us</h3>
          <div className="social-media-icons">
            {/* <a href="https://www.facebook.com">
              <i className="fab fa-facebook"></i>
            </a> */}
            <a href="https://instagram.com/farm_house_demo?igshid=ZDc4ODBmNjlmNQ==">
              {/* <i className="fab fa-instagram"></i> */}
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: MooreMarget@gmail.com</p>
        </div>
      </div>
      {/* <div className="footer-bottom">
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </div> */}
    </footer>
  );
}

export default Footer;
