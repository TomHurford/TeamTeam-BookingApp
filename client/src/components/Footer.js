import React from "react";
import {Link} from 'react-router-dom';
function Footer(){
    return(
      <footer className="footer">
          <ul>
           <li><p><Link to = "/about">About</Link></p></li>
           <li><p><Link to = "/privacy">Privacy</Link></p></li>
           <li><p><Link to = "/terms">Terms</Link></p></li>
          </ul>
      </footer>
    )
}
export default Footer;
