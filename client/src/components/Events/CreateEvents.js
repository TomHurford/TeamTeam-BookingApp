import React from "react";
import { Formik, FieldArray, Field, ErrorMessage } from "formik";
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
              <label
                className={`form-label ${
                  formikProps.errors.eventName && formikProps.touched.eventName
                    ? " text-danger"
                    : ""
                }`}
                htmlFor="eventName"
              >
                {formikProps.touched.eventName && formikProps.errors.eventName
                  ? formikProps.errors.eventName
                  : "Event Name"}
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
              <label
                className={`form-label ${
                  formikProps.errors.description &&
                  formikProps.touched.description
                    ? " text-danger"
                    : ""
                }`}
                htmlFor="description"
              >
                {formikProps.touched.description &&
                formikProps.errors.description
                  ? formikProps.errors.description
                  : "Event Description"}
              </label>
              <textarea
                name="description"
                value={formikProps.values.description}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
              ></textarea>
            </div>

            <div className="form-group">
              <label
                className={`form-label ${
                  formikProps.errors.date && formikProps.touched.date
                    ? " text-danger"
                    : ""
                }`}
                htmlFor="date"
              >
                {formikProps.touched.date && formikProps.errors.date
                  ? formikProps.errors.date
                  : "Event Date"}
              </label>
              <input
                name="date"
                value={formikProps.values.date}
                onChange={formikProps.handleChange}
                type="date"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
            </div>
            <div className="form-group">
              <label
                className={`form-label ${
                  formikProps.errors.time && formikProps.touched.time
                    ? " text-danger"
                    : ""
                }`}
                htmlFor="time"
              >
                {formikProps.touched.time && formikProps.errors.time
                  ? formikProps.errors.time
                  : "Event Time"}
              </label>
              <input
                name="time"
                value={formikProps.values.time}
                onChange={formikProps.handleChange}
                type="time"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
            </div>
            <div className="form-group">
              <label
                className={`form-label ${
                  formikProps.errors.location && formikProps.touched.location
                    ? " text-danger"
                    : ""
                }`}
                htmlFor="location"
              >
                {formikProps.touched.location && formikProps.errors.location
                  ? formikProps.errors.location
                  : "Event Location"}
              </label>
              <input
                name="location"
                value={formikProps.values.location}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
              />
            </div>
            <div className="form-group">
              <label
                className={`form-label ${
                  formikProps.errors.societyId && formikProps.touched.societyId
                    ? " text-danger"
                    : ""
                }`}
                htmlFor="societyId"
              >
                {formikProps.touched.societyId && formikProps.errors.societyId
                  ? formikProps.errors.societyId
                  : "Society ID"}
              </label>
              <input
                name="societyId"
                value={formikProps.values.societyId}
                onChange={formikProps.handleChange}
                type="text"
                className="form-control"
                onBlur={formikProps.handleBlur}
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
                            <label>Ticket Type Name</label>
                            <input
                              name="ticketName"
                              onChange={formikProps.handleChange}
                              type="text"
                              className="form-control"
                              onBlur={formikProps.handleBlur}
                              {...fieldProps.field}
                            ></input>
                          </div>
                        )}
                      </Field>

                      <ErrorMessage name={`ticketInfo.${index}.ticketName`}>
                        {(errorMsg) => (
                          <div className="text-danger">{errorMsg}</div>
                        )}
                      </ErrorMessage>

                      <Field name={`ticketInfo.${index}.price`}>
                        {(fieldProps) => (
                          <div className="form-group">
                            <label
                              className={`form-label ${
                                formikProps.errors.price &&
                                formikProps.touched.price
                                  ? "text-danger"
                                  : ""
                              }`}
                              htmlFor="price"
                            >
                              {formikProps.touched.price &&
                              formikProps.errors.price
                                ? formikProps.errors.price
                                : "Ticket Price"}
                            </label>
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
                            <label
                              className={`form-label ${
                                formikProps.errors.quantity &&
                                formikProps.touched.quantity
                                  ? "text-danger"
                                  : ""
                              }`}
                              htmlFor="quantity"
                            >
                              {formikProps.touched.quantity &&
                              formikProps.errors.quantity
                                ? formikProps.errors.quantity
                                : "Ticket Quantity Available"}
                            </label>
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
