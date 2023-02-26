
import React, { useEffect } from 'react';
import '../styles/Logout.css';
const axios = require('axios').default;
const jwtController = require('../utils/jwt.js');


// Create a login component that prints the input email and password to the console
function Logout() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [headerText, setHeaderText] = React.useState("You Aren't Logged In");

    useEffect(() => {
        jwtController.checkIsLoggedIn();
        setIsLoggedIn(jwtController.getIsLoggedIn());
        console.log(isLoggedIn);
        if (isLoggedIn) {
            /* LOGOUT */
            const token = jwtController.getToken();

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
            axios.post('http://localhost:5001/user/logout', {}, {
                headers: headers
              }).then((res) => {
                console.log(res);
            
                if (res.status == 200) {
                    jwtController.removeToken();
                    window.location = '/';
                } else {
                    setHeaderText(res.body.message);
                }
              }).catch(err => {
                console.log(err);
              });
        }
    }, []);
    
    return (
        <div className='page-container'>
            <div className='underlay'></div>

            <h2 className='logout'>{headerText}</h2>
            <a className='logout' onClick={() => {window.location = '/login'}}><button className='logout'>Log In</button></a>
        </div>
    );
}

export default Logout;
