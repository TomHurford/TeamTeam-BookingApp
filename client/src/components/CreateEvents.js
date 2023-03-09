import React, { useState } from "react";
import "../styles/CreateEvents.css";
import "../styles/TitleOfPage.css"
const jwtController = require('../utils/jwt.js');



function CreateEvents() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [societyId, setSocietyId] = useState("");
    const [time, setTime] = useState("");

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
          "name": title,
          "description": description,
          "date": date + "T" + time + ":00.000Z",
          "location": location,
          "societyId": parseInt(societyId),
          // "id": 1
    
        };
        console.log(jwtController.getToken());
        console.log(event);
        fetch("http://localhost:5001/events/create", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtController.getToken()
          },
          body: JSON.stringify(event)
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    
    return (
      <div className="page-container">
        <div className="create">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
            <label>Event Title:</label>
            <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <label>Event Description:</label>
            <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Event Date:</label>
            <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
            <label>Event Time:</label>
            <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            />
            <label>Event Location:</label>
            <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />

            <label>Society ID:</label>
            <input
            type="text"
            required
            value={societyId}
            onChange={(e) => setSocietyId(e.target.value)}
            />
           
            <button>Add Event</button>
        </form>
        </div>
      </div>
    );
    }

export default CreateEvents;