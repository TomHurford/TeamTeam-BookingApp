import React, { useState } from "react";
import "../styles/EditEvent.css";
import "../styles/TitleOfPage.css";
import jwtController from "../utils/jwt";

function EditEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      name,
      description,
      location,
      date,
      time,
    };
    console.log(jwtController.getToken());
    console.log(JSON.stringify(event));
    fetch("http://localhost:5001/events/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtController.getToken(),
      },
      body: JSON.stringify(event),
    })
      .then((response) => {
        response.json().then((data) => {
          console.log(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="page-container">
      <div className="edit">
        <h2>Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <label>Location:</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            /></textarea>
            <label>Date:</label>
            <input
            name="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
          <label>Time:</label>
          <input
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">Update Event</button>
        </form>
      </div>
    </div>
  );
}

export default EditEvent;

