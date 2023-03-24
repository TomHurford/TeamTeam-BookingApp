import React from "react";
import { Link } from "react-router-dom";

//A component for the footer. It contains links to the about, privacy and terms and conditions pages.
function Footer() {
  return (
    <footer className="footer">
      <ul>
        <li>
          <p>
            <Link to="/about">About</Link>
          </p>
        </li>
        <li>
          <p>
            <Link to="/privacy">Privacy</Link>
          </p>
        </li>
        <li>
          <p>
            <Link to="/terms">Terms and Conditions</Link>
          </p>
        </li>
      </ul>
    </footer>
  );
}
export default Footer;
