import React from "react";
import {Link} from 'react-router-dom';
import '../styles/Footer.css'
function Footer(){
    return(
        <footer className="footer">
        <div>
          <ul className="links">
           <li><p><Link to = "/about"><li>About</li></Link></p></li>
           <li><p><Link to = "/privacy"><li>Privacy</li></Link></p></li>
           <li><p><Link to = "/terms"><li>Terms</li></Link></p></li>
          </ul>
        </div>
      </footer>
    )
}
export default Footer

  
