import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            Discover a world of fantasy and adventure with our exclusive book
            collections.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">Categories</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Icons */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@fantasybooks.com</p>
          <p>Phone: +123 456 7890</p>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 Fantasy Books. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
