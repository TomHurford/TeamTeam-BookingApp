import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../styles/CreateEvents.css";
import "../styles/TitleOfPage.css"
const jwtController = require('../utils/jwt.js');

function CreateEvents2() {
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
      ],
    },
     validationSchema: Yup.object({
        title: "",
        description: "",
        date: "",
        location: "",
        societyId: "",
        time: "",
     }),

    // }),

    onSubmit: (values) => {
        console.log(values);
        //e.preventDefault();
        // const event = {
        //   "name": title,
        //   "description": description,
        //   "date": date + "T" + time + ":00.000Z",
        //   "location": location,
        //   "societyId": parseInt(societyId),
        //   "ticketType": ticketInfo
        // };
        // console.log(jwtController.getToken());
        // console.log(JSON.stringify(event));
        // fetch("http://localhost:5001/events/create", {
        //   method: "POST",
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Bearer ' + jwtController.getToken()
        //   },
        //   body: JSON.stringify(event)
        // })
        // .then((response) => {
        //   response.json().then((data) => {
        //     const event = data.event;
        //     window.location.href = '/event-details?eventId=' + event.id;
        //   });
        // })
        // .catch((error) => {
        //   console.log(error);
        // });
    },
});

// handleFieldChange = (index, event) => {
//     var data = [...ticketInfo];
//     console.log(event.target.name);
//     if(event.target.name === "price" || event.target.name === "quantity"){
//       data[index][event.target.name] = parseInt(event.target.value);
//       setTicketInfo(data);
//       return;
//     }
//     data[index][event.target.name] = event.target.value;
//     setTicketInfo(data);
//   }

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
        <form onSubmit={formik.handleSubmit} >
            <label>Event Title:</label>
            <input
            name = "eventName"
            type="text"
            required
            value={formik.title}
            onChange={formik.handleChange}
            />
            <label>Event Description:</label>
            <textarea
            name= "eventDescription"
            required
            value={formik.description}
            onChange={formik.handleChange}
            ></textarea>
            <label>Event Date:</label>
            <input
            name="eventDate"
            type="date"
            required
            value={formik.date}
            onChange={formik.handleChange}
            />
            <label>Event Time:</label>
            <input
            name="eventTime"
            type="time"
            required
            value={formik.time}
            onChange={formik.handleChange}
            />
            <label>Event Location:</label>
            <input
            name="eventLocation"
            type="text"
            required
            value={formik.location}
            onChange={formik.handleChange}
            />

            <label>Society ID:</label>
            <input
            name="societyId"
            type="number"
            required
            value={formik.societyId}
            onChange={formik.handleChange}
            />
          <div>
            {/* {formik.ticketInfo.map((input, index) => {
              return(
              <div key={index}>
                <label>Ticket Name:</label>
                <input
                name="name"
                data-testid= {"ticketName" + index}
                type="text"
                required
                value={input.name}
                onChange={formik.handleChange}
                />
                <label>Ticket Price:</label>
                <input
                name="price"
                data-testid= {"ticketPrice" + index}
                type="number"
                required
                value={input.price}
                onChange={formik.handleChange}
                />
                <label>Ticket Quantity:</label>
                <input
                name="quantity"
                data-testid= {"ticketQuantity" + index}
                type="number"
                required
                value={input.quantity}
                onChange={formik.handleChange}
                />
                <button data-testid={"removeRow" + index} onClick={() => removeRow(index)}>Remove</button>
              </div>
              )
            })} */}
            <button type="button" data-testid="addMore" onClick={addRow} >Add More</button> 
          </div>
            <button type="submit">Add Event</button>
        </form>
        </div>
      </div>
);
}

export default CreateEvents2;