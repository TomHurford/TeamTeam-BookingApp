import React from 'react';
import '../styles/Navbar.css';
import {Link} from 'react-router-dom';

//Create a navbar component

function Navbar() {
    return (
        <div>
        <nav className = "navbar">
            <ul className='navbarElements'>
                <Link to = "/"><li>Home</li></Link>
                <Link to = "/societies"><li>Societies</li></Link>
                <Link to = "/signup"><li>Sign up</li></Link>
                <Link to = "/login"><li>Login</li></Link>
                <Link to = "/contact"><li>Contact</li></Link>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar