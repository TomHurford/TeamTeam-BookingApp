import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { useFormik } from "formik";
import * as Yup from "yup";
import "../../styles/index.css";

function ContactSocietyForm(props) {
  const form = useRef();

  const formik = useFormik({
    initialValues: {
      customerName: "",
      customerEmail: "",
      messageSubject: "",
      message: "",
      societyName: props.societyName,
      societyEmail: props.societyEmail,
    },

    validationSchema: Yup.object({
      customerName: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters long")
        .required("You must enter your name"),
      customerEmail: Yup.string().email().required("You must enter your email"),
      messageSubject: Yup.string()
        .trim()
        .min(3, "Subject must be at least 3 characters long")
        .required("A subject is required"),
      message: Yup.string()
        .trim()
        .min(50, "Message must be at least 50 characters long")
        .required("A message is required"),
    }),

    onSubmit: async (values) => {
      const emailContent = {
        messageSubject: values.messageSubject,
        message: values.message,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        societyName: props.societyName,
        societyEmail: props.societyEmail,
      };
      emailjs
        .send(
          "service_t9bv478",
          "template_917cnof",
          emailContent,
          "sVET7bHYSxTjvXd30"
        )
        .then(
          (result) => {
            alert("Message sent, we will get back to you shortly");
          },
          (error) => {
            console.log(error.text);
          }
        );
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
        ref={form}
        onSubmit={formik.handleSubmit}
        style={{
          width: "95%",
          marginLeft: 38,
        }}
      >
        <div className="field">
          <label
            htmlFor="societyName"
            name="societyName"
            value={props.societyName}
          ></label>
        </div>
        <div className="field">
          <label
            htmlFor="societyEmail"
            name="societyEmail"
            value="nidhuravee@gmail.com"
          ></label>
        </div>
        <div className="form-group">
          <label htmlFor="customerName">Your Name</label>
          <input
            name="customerName"
            value={formik.values.customerName}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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
          value="send"
          className="button"
          type="submit"
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
