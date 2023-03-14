import React from 'react';
import '../styles/About.css';
//A component for Contact page to be added

function About(){
    return(
        <div className='page-container'>
            <div className='underlay'></div>
            <h1 className='title1'>About Us</h1>
            <p className='title2'>we are an event booking application with the aim to help consumers have access to events avaiable </p>
            <p className='title3'>How to join societies:</p>
            <p className='data'>A user must log in and join the society in the societies page</p>
            <p className='title3'>How to make a society:</p>
            <p className='data'>Any user may make a society on the societies page, they will then be the president</p>
            <p className='title3'>Functionality of the president and commitee members:</p>
            <p className='data'>The president may assign and remove commitee members, edit society and event pages, see other commitee members and may give his role to another user if wanted <br></br>Commitee members have all the functionality of the president besides assigning or removing commitee members and passing on roles</p>
            <p className='title3'>Purchases:</p>
            <p className='data'>Purchases may only be made following signing in</p>
            <p className='title3'>Making an event:</p>
            <p className='data'>presidents and commitee members may mak ean event from their societies data page</p>
            <p className='title3'>When do you have to be signed in</p>
            <p className='data'>To make purchases, If you are a committe member or president you must log in before editing event/society information</p>
            <p className='title3'>What if an event runs out of spaces</p>
            <p className='data'>A user must leave the event before space is allowed again, and hence they get a refund depending on  the societies policy</p>

        </div>
    )
}
export default About