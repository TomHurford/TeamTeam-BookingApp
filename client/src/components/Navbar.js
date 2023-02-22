import React from 'react';
import '../styles/Navbar.css';
import {Link} from 'react-router-dom';
import logo from '../utils/logo.png';
import basket from '../utils/basket.png'
const jwtController = require('../utils/jwt.js');

//Create a navbar component

function Navbar() {
    return (
        <div>
        <nav className = "navbar">
            <ul className='navbarElements'>
                <Link to = "/"><div className='appLogo' ><img src = {logo} alt = "Logo"></img></div></Link>
                <Link to = "/"><li>Home</li></Link>
                <Link to = "/societies"><li>Societies</li></Link>
                <Link to = "/login"><li>Login / SignUp</li></Link>
                <Link to = "/profile"><li>Profile</li></Link>
                <Link to = "/logout"><li>Logout</li></Link>
                <Link to = "/contact"><li>Contact</li></Link>
                <Link to = "/basket"><div className='basketLogo'><img src = {basket} alt = "Basket"></img></div></Link>
                <Link to = "/purchase"><li>Purchase</li></Link>
                <Link to = "/paypal"><li>PayPal</li></Link>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar