import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

function ContactSocietyForm(props) {
  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerEmail: "",
      messageSubject: "",
      message: "",
    },

    validationSchema: Yup.object({
      customerName: Yup.string().required("You must enter your name"),
      customerEmail: Yup.string().email().required("You must enter your email"),
      messageSubject: Yup.string().required("A subject is required"),
      message: Yup.string()
        .min(50, "Message must be at least 50 characters long")
        .required("A message is required"),
    }),

    onSubmit: async (values) => {
      console.log(values);
    },
  });

  return (
    <div
      style={{
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: "#abc4ff",
      }}
    >
      <h3>
        <center>Contact: {props.societyName}</center>
      </h3>

      <form
        onSubmit={formik.handleSubmit}
        style={{
          width: "95%",
          marginLeft: 38,
        }}
      >
        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.customerName && formik.errors.customerName
                ? " text-danger"
                : ""
            }`}
            htmlFor="customerName"
          >
            {formik.touched.customerName && formik.errors.customerName
              ? formik.errors.customerName
              : "Your Name"}
          </label>
          <input
            name="customerName"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.customerEmail && formik.errors.customerEmail
                ? " text-danger"
                : ""
            }`}
            htmlFor="customerEmail"
          >
            {formik.touched.customerEmail && formik.errors.customerEmail
              ? formik.errors.customerEmail
              : "Your Email"}
          </label>
          <input
            name="customerEmail"
            value={formik.values.customerEmail}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.messageSubject && formik.errors.messageSubject
                ? " text-danger"
                : ""
            }`}
            htmlFor="messageSubject"
          >
            {formik.touched.messageSubject && formik.errors.messageSubject
              ? formik.errors.messageSubject
              : "Subject of your query"}
          </label>
          <input
            name="messageSubject"
            value={formik.values.messageSubject}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.message && formik.errors.message
                ? " text-danger"
                : ""
            }`}
            htmlFor="message"
          >
            {formik.touched.message && formik.errors.message
              ? formik.errors.message
              : "Your query"}
          </label>
          <textarea
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
            rows="8"
            cols="173"
            style={{ marginBottom: "8px" }}
          ></textarea>
        </div>

        <button
          className="btn btn-primary"
          style={{
            marginBottom: "8px",
          }}
        >
          Submit query
        </button>
      </form>
    </div>
  );
}

export default ContactSocietyForm;
