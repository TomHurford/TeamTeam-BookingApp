// page that will retreive and present all the upcoming booked evetns for a user on this page. this is front end code
// Path: client/src/components/Upcoming.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/UpcomingEvents.css";

function UpcomingEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="upcomingEvents">
      <h1>Upcoming Events</h1>   
      <div className="upcomingEvents__container">

        {events.map((event) => (
          <div className="upcomingEvents__card">
            <div className="upcomingEvents__image">
            </div>
            <div className="upcomingEvents__info">
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

export default UpcomingEvents;
//
//
