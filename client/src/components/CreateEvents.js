import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/CreateEvents.css";
import "../styles/TitleOfPage.css"
const jwtController = require('../utils/jwt.js');


function CreateEvents() {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      location: "",
      societyId: "",
      time: "",
      ticketInfo: [
        {name: '', price: 0, quantity: 0}
    ]
    },
    validationSchema : Yup.object().shape({
      eventName: Yup.string().required("Event title is required"),
      eventDescription: Yup.string().required("Event description is required"),
      eventDate: Yup.date()
        .required("Event date is required")
        .min(new Date(), "Event date cannot be in the past"),
      //eventtime is not in past
      eventTime: Yup.time().required("Event time is required").test("is-in-past", "Event time cannot be in the past", value => {
        const eventDate = formik.values.eventDate;
        const eventTime = value;
        const eventDateTime = new Date(eventDate + "T" + eventTime + ":00.000Z");
        const now = new Date();
        return eventDateTime > now;
      }),
      eventLocation: Yup.string().required("Event location is required"),
      societyId: Yup.number().min(1, "Society ID must be greater than 0").required("Society ID is required"),
      ticketType: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required("Ticket name is required"),
          price: Yup.number().min(0, "Ticket price cannot be negative").required("Ticket price is required"),
          quantity: Yup.number().min(1, "Ticket quantity must be greater than 0").required("Ticket quantity is required"),
        })

      )}),


    onSubmit: (values) => {
      console.log(values);
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
            const event = data.event;
            window.location.href = '/event-details?eventId=' + event.id;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    handleFieldChange = (index, event) => {
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
      var data = [...ticketInfo];
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