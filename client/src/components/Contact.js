import React from 'react';
import '../styles/Contact.css';
import ContactForm from './ContactForm';
//A component for Contact page to be added

function Contact(){
    return(
        <div className='page-container'>
            <div className='underlay'></div>
            <h1 className='title'>Who are we</h1>
            <p className="data">Ticketopia is...</p>

        <ContactForm />
        </div>
    )
}
export default Contact