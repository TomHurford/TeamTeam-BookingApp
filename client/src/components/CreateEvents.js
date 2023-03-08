import React, { useState } from "react";
import axios from "axios";
import "../styles/CreateEvents.css";
import "../styles/TitleOfPage.css"
const jwtController = require('../utils/jwt.js');



function CreateEvents() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
          "name": title,
          "description": description,
          "date": "2023-12-02T00:00:00.000Z",
          "location": location,
          "societyId": 1,
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
      //   axios
      // .post("http://localhost:5001/events/create", 
      //  {headers : {
      //   'Content-Type': 'application/json',
      //   Authorization: 'Bearer ' + jwtController.getToken()
      // }},
      // event
      // )
      // .then((response) => {
      //   console.log(response.data);
      //   // TODO: handle success
      // })
      // .catch((error) => {
      //   console.log(error);
      //   // TODO: handle error
      // });
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
            <label>Event Location:</label>
            <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
           
            <button>Add Event</button>
        </form>
        </div>
      </div>
    );
    }

export default CreateEvents;