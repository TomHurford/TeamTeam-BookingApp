import React from "react";
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
//import "../styles/EditEvent.css";
//import "../styles/TitleOfPage.css";
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
        validationSchema={Yup.object({
          eventName: Yup.string().required("Event name is required"),
          description: Yup.string()
            .min(30, "Event description must be at least 30 characters.")
            .required("Event description is required"),
          date: Yup.date().required("Event date is required"),
          location: Yup.string().required("Event location is required"),
          time: Yup.string().required("Event time is required"),
        })}
        onSubmit={(value) => {
          console.log(value);

          const event = {
            name: value.eventName,
            description: value.description,
            date: value.date + "T" + value.time + ":00.000Z",
            location: value.location,
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
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <div className="form-group">
              <label>Name:</label>
              <input
                name="eventName"
                value={formikProps.values.eventName}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
              {formikProps.touched.eventName && formikProps.errors.eventName ? (
                <label className="errortext" htmlFor="eventName">
                  {formikProps.errors.eventName}
                  <br />
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formikProps.values.description}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
              ></textarea>
              {formikProps.touched.description &&
              formikProps.errors.description ? (
                <label className="errortext" htmlFor="description">
                  {formikProps.errors.description}
                  <br />
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label>Location:</label>
              <input
                name="location"
                value={formikProps.values.location}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
              {formikProps.touched.location && formikProps.errors.location ? (
                <label className="errortext" htmlFor="location">
                  {formikProps.errors.location}
                  <br />
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input
                name="date"
                value={formikProps.values.date}
                onChange={formikProps.handleChange}
                type="date"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
              {formikProps.touched.date && formikProps.errors.date ? (
                <label className="errortext" htmlFor="date">
                  {formikProps.errors.date}
                  <br />
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label>Time:</label>
              <input
                name="time"
                value={formikProps.values.time}
                onChange={formikProps.handleChange}
                type="time"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
            </div>
            {formikProps.touched.time && formikProps.errors.time ? (
              <label className="errortext" htmlFor="time">
                {formikProps.errors.time}
                <br />
              </label>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "15px" }}
            >
              Update Event
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditEvents;
