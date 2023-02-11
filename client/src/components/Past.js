// Create past event page for a user to display on the past events page for a user on the front end code the page here and then create the route and controller for the page
//
// Path: client/src/components/Past.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Past.css";


function PastEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pastEvents">
      <h1>Past Events</h1>   
      <div className="pastEvents__container">

        {events.map((event) => (
          <div className="pastEvents__card">
            <div className="pastEvents__image">
            </div>
            <div className="pastEvents__info">
              <h2>{event.name}</h2>
              <p>{event.description}</p>
              <p>{event.date}</p>
              <p>{event.time}</p>
              <p>{event.location}</p>
              <p>{event.price}</p>
              <Link to={`/events/${event._id}`}>
                <button>View Event</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PastEvents;



