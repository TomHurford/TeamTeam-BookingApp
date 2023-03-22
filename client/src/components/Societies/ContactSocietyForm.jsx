import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/index.css";

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
    <div className="container">
      <h1>Contact</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="field">
          <label htmlFor="customerName">Your Name</label>
          <input
            name="customerName"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            type="text"
            onBlur={formik.handleBlur}
          />
          {formik.touched.customerName && formik.errors.customerName ? (
            <label className="errortext" htmlFor="customerName">
              {formik.errors.customerName}
              <br />
            </label>
          ) : (
            ""
          )}
        </div>

        <div className="field">
          <label htmlFor="customerEmail">Your Email</label>
          <input
            name="customerEmail"
            value={formik.values.customerEmail}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
          {formik.touched.customerEmail && formik.errors.customerEmail ? (
            <label className="errortext" htmlFor="customerEmail">
              {formik.errors.customerEmail}
              <br />
            </label>
          ) : (
            ""
          )}
        </div>

        <div className="field">
          <label htmlFor="messageSubject">Subject of your query</label>
          <input
            name="messageSubject"
            value={formik.values.messageSubject}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
          {formik.touched.messageSubject && formik.errors.messageSubject ? (
            <label className="errortext" htmlFor="messageSubject">
              {formik.errors.messageSubject}
              <br />
            </label>
          ) : (
            ""
          )}
        </div>

        <div className="field">
          <label htmlFor="message">Your query</label>
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
          {formik.touched.message && formik.errors.message ? (
            <label className="errortext" htmlFor="message">
              {formik.errors.message}
              <br />
            </label>
          ) : (
            ""
          )}
        </div>

        <button
          className="button"
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
