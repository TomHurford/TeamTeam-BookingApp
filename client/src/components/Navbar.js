
import React from 'react';
import '../styles/Navbar.css';
import {Link} from 'react-router-dom';



//Create a navbar component

function Navbar() {
    return (
        <div>
        <nav className = "navbar">
            <ul className='navbarElements'>
                <Link to = "/Purchase"><li>Purchase</li></Link>
                <Link to = "/PayPal"><li>PayPal</li></Link>          
            </ul>
        </nav>
        </div>
    )
}
export default Navbar