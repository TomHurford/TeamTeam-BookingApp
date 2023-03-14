import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import EditSocietyCommittee from "./ChangeSocietyMembers/EditSocietyCommittee";
import "../../styles/Society.css";
const jwtController = require('../../utils/jwt.js');

function EditSocietyForm() {
  const formik = useFormik({
    initialValues: {
      societyId: 0,
      societyName: "",
      category: "",
      societyEmail: "",
      description: "",
      website: "",
      instagram: "",
      twitter: "",
      facebook: "",
      logo: "",
      banner: "",
    },

    validationSchema: Yup.object({
      societyId: Yup.number().moreThan(0, "Society ID must be a positive number").required("Society ID is required"),
      societyName: Yup.string(),
      societyEmail: Yup.string().email("Must be a valid email address"),
      description: Yup.string()
        .min(50, "Society description must be at least 50 characters."),
      website: Yup.string().url("Must be a valid URL"),
      instagram: Yup.string().url("Must be a valid URL"),
      twitter: Yup.string().url("Must be a valid URL"),
      facebook: Yup.string().url("Must be a valid URL"),
      logo: Yup.string().url("Must be a valid URL"),
      banner: Yup.string().url("Must be a valid URL"),
    }),

    onSubmit: (values) => {
      if(values.societyName === "" && values.category === "" && values.description === "" && values.website === "" 
      && values.instagram === "" && values.twitter === "" && values.facebook === "" && values.logo === "" && 
      values.banner === "" && values.societyEmail === "") {
        alert("Please fill in at least one field");
      } else {
      const data = {
        societyId: values.societyId,
        name: values.societyName,
        category: values.category,
        email: values.societyEmail,
        description: values.description,
        links: {
          website: values.website,
          instagram: values.instagram,
          twitter: values.twitter,
          facebook: values.facebook,
          logo: values.logo,
          banner: values.banner,
        },
      };
      console.log(jwtController.getToken());
      console.log(values);
      console.log(data);
      fetch("http://localhost:5001/societies/updateSociety", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwtController.getToken(),
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.status)
        .then((status) => {
          if (status === 200) {
            alert("Society updated successfully!");
          } else {
            alert("Error updating society");
          }
        })
      }
    },
  });

  return (
    <div style={{ marginTop: "60px", marginLeft: "8px" }}>
      <h1>Edit Society</h1>

      <form onSubmit={formik.handleSubmit}>
        {/* <fieldset disabled> */}
          <div className="form-group">
            <label className="form-label" htmlFor="societyName">
              Society Name
            </label>
            <input
              name="societyName"
              value={formik.values.societyName}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="form-select"
            >
              <option defaultValue></option>
              <option>Academic</option>
              <option>Social</option>
              <option>Other</option>
              <option>Sports</option>
            </select>
          </div>
        {/* </fieldset> */}

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.societyId && formik.errors.societyId
                ? " text-danger"
                : ""
            }`}
            htmlFor="societyId"
          >
            {formik.touched.societyId && formik.errors.societyId
              ? formik.errors.societyId
              : "Society ID"}
          </label>
          <input
            name="societyId"
            value={formik.values.societyId}
            onChange={formik.handleChange}
            type="number"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.societyEmail && formik.errors.societyEmail
                ? " text-danger"
                : ""
            }`}
            htmlFor="societyEmail"
          >
            {formik.touched.societyEmail && formik.errors.societyEmail
              ? formik.errors.societyEmail
              : "Society Email"}
          </label>
          <input
            name="societyEmail"
            value={formik.values.societyEmail}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>


        {/* Socials below*/}
        <h5>Socials</h5>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.website && formik.errors.website
                ? " text-danger"
                : ""
            }`}
            htmlFor="website"
          >
            {formik.touched.website && formik.errors.website
              ? formik.errors.website
              : "Website"}
          </label>
          <input
            name="website"
            value={formik.values.website}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.instagram && formik.errors.instagram
                ? " text-danger"
                : ""
            }`}
            htmlFor="instagram"
          >
            {formik.touched.instagram && formik.errors.instagram
              ? formik.errors.instagram
              : "Instagram"}
          </label>
          <input
            name="instagram"
            value={formik.values.instagram}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.twitter && formik.errors.twitter
                ? " text-danger"
                : ""
            }`}
            htmlFor="twitter"
          >
            {formik.touched.twitter && formik.errors.twitter
              ? formik.errors.twitter
              : "Twitter"}
          </label>
          <input
            name="twitter"
            value={formik.values.twitter}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.facebook && formik.errors.facebook
                ? " text-danger"
                : ""
            }`}
            htmlFor="facebook"
          >
            {formik.touched.facebook && formik.errors.facebook
              ? formik.errors.facebook
              : "Facebook"}
          </label>
          <input
            name="facebook"
            value={formik.values.facebook}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        {/* Image links below*/}
        <h5>Images</h5>
        <small id="imageHelp" className="form-text text-muted">
          You must enter a link to the images
        </small>
        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.logo && formik.errors.logo ? " text-danger" : ""
            }`}
            htmlFor="logo"
          >
            {formik.touched.logo && formik.errors.logo
              ? formik.errors.logo
              : "Society Logo"}
          </label>
          <input
            name="logo"
            value={formik.values.logo}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.banner && formik.errors.banner
                ? " text-danger"
                : ""
            }`}
            htmlFor="banner"
          >
            {formik.touched.banner && formik.errors.banner
              ? formik.errors.banner
              : "Society Banner"}
          </label>
          <input
            name="banner"
            value={formik.values.banner}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
        </div>

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.description && formik.errors.description
                ? " text-danger"
                : ""
            }`}
            htmlFor="description"
          >
            {formik.touched.description && formik.errors.description
              ? formik.errors.description
              : "Society Description"}
          </label>
          <textarea
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
            rows="8"
            cols="173"
            style={{ marginBottom: "8px" }}
          ></textarea>
        </div>

        <button className="btn btn-primary">Save</button>
      </form>

      <EditSocietyCommittee />
    </div>
  );
}

export default EditSocietyForm;
