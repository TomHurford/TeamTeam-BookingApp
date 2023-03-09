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
    const [ticketInfo, setTicketInfo] = useState([
      {name: '', price: 0, quantity: 0}
  ])

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
          "name": title,
          "description": description,
          "date": date + "T" + time + ":00.000Z",
          "location": location,
          "societyId": parseInt(societyId),
          "ticketType": ticketInfo
        };
        console.log(jwtController.getToken());
        console.log(JSON.stringify(event));
        fetch("http://localhost:5001/events/create", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtController.getToken()
          },
          body: JSON.stringify(event)
        })
        .then((response) => {
          response.json().then((data) => {
            console.log(data);
            console.log(data.event);
            const event = data.event;
            console.log(event.id);
            window.location.href = '/event-details?eventId=' + event.id;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const handleFieldChange = (index, event) => {
      var data = [...ticketInfo];
      console.log(event.target.name);
      if(event.target.name === "price" || event.target.name === "quantity"){
        data[index][event.target.name] = parseInt(event.target.value);
        setTicketInfo(data);
        return;
      }
      data[index][event.target.name] = event.target.value;
      setTicketInfo(data);
    }

    const addRow = () => {
      var newInfo = {name: '', price: 0, quantity: 0 }
      setTicketInfo([...ticketInfo, newInfo])

    }

    const removeRow = (index) => {
      let data = [...ticketInfo];
      data.splice(index, 1);
      setTicketInfo(data);
    }
    
    return (
      <div className="page-container">
        <div className="create">
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit} >
            <label>Event Title:</label>
            <input
            name = "eventName"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <label>Event Description:</label>
            <textarea
            name= "eventDescription"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <label>Event Date:</label>
            <input
            name="eventDate"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            />
            <label>Event Time:</label>
            <input
            name="eventTime"
            type="time"
            required
            value={time}
            onChange={(e) => setTime(e.target.value)}
            />
            <label>Event Location:</label>
            <input
            name="eventLocation"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />

            <label>Society ID:</label>
            <input
            name="societyId"
            type="number"
            required
            value={societyId}
            onChange={(e) => setSocietyId(e.target.value)}
            />
          <div>
            {ticketInfo.map((input, index) => {
              return(
              <div key={index}>
                <label>Ticket Name:</label>
                <input
                name="name"
                data-testid= {"ticketName" + index}
                type="text"
                required
                value={input.name}
                onChange={event => handleFieldChange(index, event)}
                />
                <label>Ticket Price:</label>
                <input
                name="price"
                data-testid= {"ticketPrice" + index}
                type="number"
                required
                value={input.price}
                onChange={event => handleFieldChange(index, event)}
                />
                <label>Ticket Quantity:</label>
                <input
                name="quantity"
                data-testid= {"ticketQuantity" + index}
                type="number"
                required
                value={input.quantity}
                onChange={event => handleFieldChange(index, event)}
                />
                <button data-testid={"removeRow" + index} onClick={() => removeRow(index)}>Remove</button>
              </div>
              )
            })}
            <button type="button" data-testid="addMore" onClick={addRow} >Add More</button> 
          </div>
            <button type="submit">Add Event</button>
        </form>
        </div>
      </div>
    );
}

export default CreateEvents;