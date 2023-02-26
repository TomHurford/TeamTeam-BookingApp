

//  Front end that presents first tcikets and then past purchases of a user using the api


import React, { useState, useEffect } from "react";


import "../styles/Purchase.css";





//Creating a purchase component to show purchase details



    // Send the post request with current user id to /purchase/future and  get the future tickets
    //Make post request to /purchase/future
    // Return html for the future tickets

function FutureTickets() {
    const [tickets, setTickets] = useState([]);

   
    
    useEffect(() => {
        fetch("http://localhost:5001/purchase/future")
        .then((res) => res.json())
        .then((data) => {
            setTickets(data);
        });
    }, []);
    
    
   //return html with the ticket data 
    return (
        <div className='page-container'>
            <div className='underlay'></div>
            <div className="purchase">
                <h1>Future Tickets</h1>
                <div className="purchase__container">
                    <div className="purchase__wrapper">
                        <ul className="purchase__items">
                            {tickets.map((ticket) => (
                                <li className="purchase__item">
                                    <div className="purchase__item__link">
                                        <div className="purchase__item__info">
                                            <h5 className="purchase__item__text">{ticket.event.name}</h5>
                                            <h5 className="purchase__item__text">{ticket.event.date}</h5>
                                            <h5 className="purchase__item__text">{ticket.event.location}</h5>
                                            <h5 className="purchase__item__text">{ticket.event.price}</h5>
                                            <h5 className="purchase__item__text">{ticket.event.description}</h5>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
                                        
    

    }

export default FutureTickets;



