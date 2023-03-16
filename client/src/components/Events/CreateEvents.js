import React from "react";
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const jwtController = require("../../utils/jwt.js");

function CreateEvents() {
  return (
    <div style={{ marginTop: "60px", marginLeft: "8px" }}>
      <h1>Create Events</h1>
      <Formik
        initialValues={{
          eventName: "",
          description: "",
          date: "",
          location: "",
          societyId: "",
          time: "",
          ticketInfo: [{ name: "", price: "", quantity: "" }],
        }}
        validationSchema={Yup.object({
          eventName: Yup.string().required("Event name is required"),
          description: Yup.string()
            .min(30, "Event description must be at least 30 characters.")
            .required("Event description is required"),
          date: Yup.date().required("Event date is required"),
          location: Yup.string().required("Event location is required"),
          societyId: Yup.number("Society ID must be a number")
            .positive("Society ID must be positive")
            .required("Society ID is required"),
          time: Yup.string().required("Event time is required"),
          ticketInfo: Yup.array().of(
            Yup.object({
              name: Yup.string().required("Ticket name is required"),
              price: Yup.number().required("Ticket price is required"),
              quantity: Yup.number()
                .positive("Ticket quantity must be positive")
                .required("Ticket quantity is required"),
            })
          ),
        })}
        onSubmit={(value) => {
          console.log("Form data");
          console.log(value);
          const event = {
            name: value.eventName,
            description: value.description,
            date: value.date + "T" + value.time + ":00.000Z",
            location: value.location,
            societyId: parseInt(value.societyId),
            ticketType: value.ticketInfo,
          };

          console.log(jwtController.getToken());
          console.log(JSON.stringify(event));
          fetch("http://localhost:5001/events/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + jwtController.getToken(),
            },
            body: JSON.stringify(event),
          })
            .then((response) => {
              response.json().then((data) => {
                const event = data.event;
                window.location.href = "/event-details?eventId=" + event.id;
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
              <label htmlFor="eventName">Event Name</label>
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
              <label htmlFor="description">Event Description</label>
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
              <label htmlFor="date">Event Date</label>
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
              <label htmlFor="time">Event Time</label>
              <input
                name="time"
                value={formikProps.values.time}
                onChange={formikProps.handleChange}
                type="time"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
              {formikProps.touched.time && formikProps.errors.time ? (
                <label className="errortext" htmlFor="time">
                  {formikProps.errors.time}
                  <br />
                </label>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <label htmlFor="location">Event Location</label>
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
              <label htmlFor="societyId">Society ID</label>
              <input
                name="societyId"
                value={formikProps.values.societyId}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
              {formikProps.touched.societyId && formikProps.errors.societyId ? (
                <label className="errortext" htmlFor="societyId">
                  {formikProps.errors.societyId}
                  <br />
                </label>
              ) : (
                ""
              )}
            </div>

            <FieldArray name="ticketInfo">
              {(fieldArrayProps) => (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        fieldArrayProps.push({
                          name: "",
                          price: "",
                          quantity: "",
                        })
                      }
                      className="btn btn-primary"
                      style={{ marginTop: "15px" }}
                    >
                      Add Ticket Type
                    </button>
                  </div>

                  {formikProps.values.ticketInfo.map((ticket, index) => (
                    <div
                      key={`ticketInfo.${index}.name`}
                      data-testid={`ticketInfo.${index}.name`}
                    >
                      console.log({`ticketInfo.${index}.name`})
                      <Field name={`ticketInfo.${index}.name`}>
                        {(fieldProps) => (
                          <div className="form-group">
                            <label>Ticket Type Name</label>
                            <input
                              name="name"
                              onChange={formikProps.handleChange}
                              type="text"
                              className="form-control"
                              onBlur={formikProps.handleBlur}
                              {...fieldProps.field}
                            ></input>
                          </div>
                        )}
                      </Field>
                      <ErrorMessage name={`ticketInfo.${index}.name`}>
                        {(errorMsg) => (
                          <div className="text-danger">{errorMsg}</div>
                        )}
                      </ErrorMessage>
                      <Field name={`ticketInfo.${index}.price`}>
                        {(fieldProps) => (
                          <div className="form-group">
                            <label>Ticket Price</label>
                            <input
                              name="price"
                              onChange={formikProps.handleChange}
                              type="number"
                              className="form-control"
                              onBlur={formikProps.handleBlur}
                              {...fieldProps.field}
                            ></input>
                          </div>
                        )}
                      </Field>
                      <ErrorMessage name={`ticketInfo.${index}.price`}>
                        {(errorMsg) => (
                          <div className="text-danger">{errorMsg}</div>
                        )}
                      </ErrorMessage>
                      <Field name={`ticketInfo.${index}.quantity`}>
                        {(fieldProps) => (
                          <div className="form-group">
                            <label>Ticket Quantity Available</label>
                            <input
                              name="quantity"
                              onChange={formikProps.handleChange}
                              type="number"
                              className="form-control"
                              onBlur={formikProps.handleBlur}
                              {...fieldProps.field}
                            ></input>

                            <ErrorMessage name={`ticketInfo.${index}.quantity`}>
                              {(errorMsg) => (
                                <div className="text-danger">{errorMsg}</div>
                              )}
                            </ErrorMessage>

                            <button
                              type="button"
                              onClick={() => fieldArrayProps.remove(index)}
                              className="btn btn-danger"
                              style={{ marginTop: "15px" }}
                            >
                              Remove Ticket Type
                            </button>
                          </div>
                        )}
                      </Field>
                    </div>
                  ))}
                </>
              )}
            </FieldArray>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "15px" }}
            >
              Create Event
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default CreateEvents;
