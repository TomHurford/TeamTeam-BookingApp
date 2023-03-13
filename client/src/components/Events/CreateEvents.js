import React from "react";
import { Formik, FieldArray, Field } from "formik";
import * as Yup from "yup";

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
          ticketInfo: [{ ticketName: "", price: "", quantity: "" }],
        }}
        validationSchema={Yup.object({
          eventName: Yup.string().required("Event name is required"),
          description: Yup.string()
            .min(30, "Event description must be at least 30 characters.")
            .required("Event description is required"),
          date: Yup.date().required("Event date is required"),
          location: Yup.string().required("Event location is required"),
          societyId: Yup.string().required("Society ID is required"),
          time: Yup.string().required("Event time is required"),
          ticketInfo: Yup.array().of(
            Yup.object({
              ticketName: Yup.string().required("Ticket name is required"),
              price: Yup.number().required("Ticket price is required"),
              quantity: Yup.number().required("Ticket quantity is required"),
            })
          ),
        })}
        onSubmit={(value) => {
          console.log(value);
        }}
      >
        {(formikProps) => (
          <form onSubmit={formikProps.handleSubmit}>
            <div className="form-group">
              <label
                className={`form-label ${
                  formikProps.eventName && formikProps.errors.eventName
                    ? " text-danger"
                    : ""
                }`}
                htmlFor="eventName"
              >
                Event Name:
              </label>
              <input
                name="eventName"
                value={formikProps.values.eventName}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
            </div>
            <div className="form-group">
              <label>Event Description:</label>
              <textarea
                name="description"
                value={formikProps.values.description}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Event Date:</label>
              <input
                name="date"
                value={formikProps.values.date}
                onChange={formikProps.handleChange}
                type="date"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Event Time:</label>
              <input
                name="time"
                value={formikProps.values.time}
                onChange={formikProps.handleChange}
                type="time"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Event Location:</label>
              <input
                name="location"
                value={formikProps.values.location}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Society ID:</label>
              <input
                name="societyId"
                value={formikProps.values.societyId}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
              />
            </div>

            <FieldArray name="ticketInfo">
              {(fieldArrayProps) => (
                <>
                  <div>
                    <button
                      type="button"
                      onClick={() =>
                        fieldArrayProps.push({
                          ticketName: "",
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
                    <div key={`ticketInfo.${index}.ticketName`}>
                      <Field name={`ticketInfo.${index}.ticketName`}>
                        {(fieldProps) => (
                          <div className="form-group">
                            <label>Ticket Type Name:</label>
                            <input
                              name="ticketName"
                              onChange={formikProps.handleChange}
                              type="text"
                              className="form-control"
                              {...fieldProps.field}
                            ></input>
                          </div>
                        )}
                      </Field>

                      <Field name={`ticketInfo.${index}.price`}>
                        {(fieldProps) => (
                          <div className="form-group">
                            <label>Ticket Price:</label>
                            <input
                              name="price"
                              onChange={formikProps.handleChange}
                              type="number"
                              className="form-control"
                              {...fieldProps.field}
                            ></input>
                          </div>
                        )}
                      </Field>

                      <Field name={`ticketInfo.${index}.quantity`}>
                        {(fieldProps) => (
                          <div className="form-group">
                            <label>Ticket Quantity Available:</label>
                            <input
                              name="quantity"
                              onChange={formikProps.handleChange}
                              type="number"
                              className="form-control"
                              {...fieldProps.field}
                            ></input>

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
