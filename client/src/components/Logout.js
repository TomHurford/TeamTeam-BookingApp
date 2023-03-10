
import React, { useEffect } from 'react';
import '../styles/Logout.css';
const jwtController = require('../utils/jwt.js');


// Create a login component that prints the input email and password to the console
function Logout() {
    const headerText = "You Aren't Logged In";

    useEffect(() => {
        jwtController.checkIsLoggedIn().then((res) => {
            res ? console.log('Logged In!') : console.log('Not Logged In!');
            if (res) {
                /* LOGOUT */
                jwtController.removeToken();
                window.location = '/';
            }
        });
    }, []);
    
    return (
        <div className='page-container'>
            <div className='underlay'></div>

            <h2 className='logout'>{headerText}</h2>
            {/* <a className='logout' onClick={() => {window.location = '/login'}}><button className='logout'>Log In</button></a> */}
        </div>
    );
}

export default Logout;
