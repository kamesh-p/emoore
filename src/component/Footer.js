import React from "react";
import "./Footer.css";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer class="footer">
      <div class="container-footers">
        <div class="row">
          <div class="footer-col">
            <h4>company</h4>
            <ul>
              <li>
                <a href="#">about us</a>
              </li>
              <li>
                <a href="#">our services</a>
              </li>
              <li>
                <a href="#">privacy policy</a>
              </li>
              <li>
                <a href="#">affiliate program</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>get help</h4>
            <ul>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">shipping</a>
              </li>
              <li>
                <a href="#">returns</a>
              </li>
              <li>
                <a href="#">order status</a>
              </li>
              <li>
                <a href="#">payment options</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>online shop</h4>
            <ul>
              <li>
                <a href="#">Books</a>
              </li>
              <li>
                <a href="#">books books</a>
              </li>
              <li>
                <a href="#">books</a>
              </li>
              <li>
                <a href="#">books</a>
              </li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>follow us</h4>
            <div class="social-links">
              <SocialIcon url="#" network="instagram" />
              <SocialIcon url="#" network="facebook" />
              <SocialIcon url="#" network="youtube" />
              <SocialIcon url="#" network="twitter" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
