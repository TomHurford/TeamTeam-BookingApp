import React, {useEffect} from 'react';
import '../styles/Navbar.css';
import {Link} from 'react-router-dom';
import logo from '../utils/logo.png';
import basket from '../utils/basket.png';
const jwtController = require('../utils/jwt.js');

//Create a navbar component

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = React.useState([]);

    useEffect(() => {
        setIsLoggedIn(jwtController.isLoggedIn());
    }, []);

    return (
        <div className='nav-container'>
        <nav className = "navbar">
            <ul className='navbarElements'>
                <Link to = "/"><li className='left'><img src = {logo} alt = "Logo"></img></li></Link>
                <Link to = "/"><li>Home</li></Link>
                <Link to = "/societies"><li>Societies</li></Link>
                { isLoggedIn ? <Link to = "/logout"><li>Logout</li></Link> : <Link to = "/login"><li>Login / SignUp</li></Link> }
                { isLoggedIn ? <Link to = "/profile"><li>Profile</li></Link> : <div></div> }
                <Link to = "/contact"><li>Contact</li></Link>
                <Link to = "/purchase"><li>Purchase</li></Link>
                <Link to = "/paypal"><li>PayPal</li></Link>
                <Link to = "/basket"><li><img src = {basket} alt = "Basket"></img></li></Link>
            </ul>
        </nav>
        </div>
    )
}
export default Navbar
