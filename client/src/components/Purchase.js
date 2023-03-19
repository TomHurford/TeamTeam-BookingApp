import React, { useState, useEffect } from "react";
import "../styles/Purchase.css";

const jwtController = require("../utils/jwt.js");

const FutureTickets = () => {
  const [futureTickets, setFutureTickets] = useState([]);
  const [pastTickets, setPastTickets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/purchase/future", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + jwtController.getToken(),
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

    fetch("http://localhost:5001/purchase", {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + jwtController.getToken(),
        }
      })
      //present events from lowest to highest date
      .then((response) => response.json())
      .then((data) => {
        const sortedTickets = data.pastTickets.sort((a, b) =>
          new Date(a.event.date) - new Date(b.event.date) 
        );
        setPastTickets(sortedTickets);
      });
      
  }, []);

  return (
    <div data-testid='Purchase' className="page-container">
        <div className="underlay"></div>
      <h1>Past Event Purchases</h1>
      <table className="purchase">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {pastTickets.length !==0 &&  pastTickets.map((ticket) => (
            <tr data-testid={ticket.id} key={ticket.id}>
              <td><a href={"/event-details?eventId=" + ticket.event.id}>{ticket.event.name}</a></td>
              <td>{new Date(ticket.event.date).toLocaleDateString()}</td>
              {ticket.tickets.map((ticket) => (
                <ul data-testid={ticket.id} key={ticket.id}>
                  <li>Ticket ID: {ticket.id}</li>
                  <li>Ticket Data: {ticket.ticketData}</li>
                </ul>))}
            </tr>
          ))}
        </tbody>
      </table>
      <h1>Upcoming Event Purchases</h1>
      <table className="purchase">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Event Date</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {futureTickets.length !==0 &&  futureTickets.map((ticket) => (
            <tr data-testid={ticket.id} key={ticket.id}>
              <td><a href={"/event-details?eventId=" + ticket.event.id}>{ticket.event.name}</a></td>
              <td>{new Date(ticket.event.date).toLocaleDateString()}</td>
              <td>
              {ticket.tickets.map((ticket) => (
                <ul data-testid={ticket.id} key={ticket.id}>
                  <li>Ticket ID: {ticket.id}</li>
                  <li>Ticket Data: {ticket.ticketData}</li>
                </ul>))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FutureTickets;
