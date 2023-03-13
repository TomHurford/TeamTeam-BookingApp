import React from "react";
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import "../styles/EditEvent.css";
import "../styles/TitleOfPage.css";
//import jwtController from "../utils/jwt";

function EditEvents() {
  return (
    <div style={{ marginTop: "60px", marginLeft: "8px" }}>
      <h1>Edit Event</h1>
      <Formik
        initialValues={{
          eventName: "",
          description: "",
          date: "",
          location: "",
          time: "",
        }}
        onSubmit={(value) => {
          console.log(value);

          // const event = {
          //   name: value.eventName,
          //   description: value.description,
          //   date: value.date + "T" + value.time + ":00.000Z",
          //   location: value.location,
          // };

          // console.log(jwtController.getToken());
          // console.log(JSON.stringify(event));

          // fetch("http://localhost:5001/events/update", {
          //   method: "PUT",
          //   headers: {
          //     "Content-Type": "application/json",
          //     Authorization: "Bearer " + jwtController.getToken(),
          //   },
          //   body: JSON.stringify(event),
          // })
          //   .then((response) => {
          //     response.json().then((data) => {
          //       console.log(data);
          //     });
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formikProps.values.eventName}
                onChange={formikProps.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                value={formikProps.values.description}
                onChange={formikProps.handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                type="text"
                value={formikProps.values.location}
                onChange={formikProps.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                name="date"
                type="date"
                value={formikProps.values.date}
                onChange={formikProps.handleChange}
              />
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input
                type="time"
                value={formikProps.values.time}
                onChange={formikProps.handleChange}
              />
            </div>
            <button type="submit">Update Event</button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditEvents;
