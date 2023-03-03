import React, { useState, useEffect } from "react";
import "../styles/Purchase.css";

const FutureTickets = () => {
  const [futureTickets, setFutureTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/purchase/future", {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      //present events from lowest to highest date
      .then((response) => response.json())
      .then((data) => {
        const sortedTickets = data.futureTickets.sort((a, b) =>
          new Date(a.event.date) - new Date(b.event.date)
        );
        setFutureTickets(sortedTickets);
      });
      
  }, []);

  return (
    <div data-testid='Purchase' className="page-container">
        <div className="underlay"></div>
       <hr></hr><hr></hr> 
      <h1>Upcoming Tickets</h1>
      <table>
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Status</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {futureTickets.map((ticket) => (
            <tr data-testid={ticket.id} key={ticket.id}>
              <td>{ticket.event.name}</td>
              <td>{new Date(ticket.event.date).toLocaleDateString()}</td>
              <td>{ticket.status}</td>
              <td>{ticket.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FutureTickets;
