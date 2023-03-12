import React, { useState } from "react";
import "../styles/CreateEvents.css";
import "../styles/TitleOfPage.css";
const jwtController = require("../utils/jwt.js");
import { useFormik, FieldArray } from "formik";
import * as Yup from "yup";

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
        { ticketId: "", ticketName: "", ticketPrice: 0, ticketQuantity: 0 },
      ],
    },

    onSubmit: (values) => {
      console.log(values);
      // e.preventDefault();
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

  return (
    <div className="page-container">
      <div className="create">
        <h2>Create Event</h2>
        <form onSubmit={formik.handleSubmit}>
          <label>Event Title:</label>
          <input
            name="title"
            type="text"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          <label>Event Description:</label>
          <textarea
            name="description"
            required
            value={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>
          <label>Event Date:</label>
          <input
            name="date"
            type="date"
            required
            value={formik.values.date}
            onChange={formik.handleChange}
          />
          <label>Event Time:</label>
          <input
            name="time"
            type="time"
            required
            value={formik.values.time}
            onChange={formik.handleChange}
          />
          <label>Event Location:</label>
          <input
            name="location"
            type="text"
            required
            value={formik.values.location}
            onChange={formik.handleChange}
          />

          <label>Society ID:</label>
          <input
            name="societyId"
            type="number"
            required
            value={formik.values.societyId}
            onChange={formik.handleChange}
          />

          <FieldArray name="ticketInfo">
            {({ push }) => (
              <div>
                {values.ticketInfo.map((ticket) => {
                  return <div key={ticket.id}>  </div>;
                })}
                <button
                  type="button"
                  onClick={() =>
                    push({
                      ticketId: "1",
                      ticketName: "",
                      ticketPrice: "",
                      ticketQuantity: "",
                    })
                  }
                >
                  Add more
                </button>
              </div>
            )}
          </FieldArray>

          {/* <label>Ticket Name:</label>
          <input
            name="ticketName"
            type="text"
            required
            value={formik.values.ticketName}
            onChange={formik.handleChange}
          />
          <label>Ticket Price:</label>
          <input
            name="ticketPrice"
            type="number"
            required
            value={formik.values.ticketPrice}
            onChange={formik.handleChange}
          />
          <label>Ticket Quantity:</label>
          <input
            name="ticketQuantity"
            type="number"
            required
            value={formik.values.ticketQuantity}
            onChange={formik.handleChange}
          /> */}

          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
}

export default CreateEvents;
