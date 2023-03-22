import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const jwtController = require("../../utils/jwt.js");
import "../../styles/index.css";

function CreateSocietyForm() {
  const formik = useFormik({
    initialValues: {
      societyName: "",
      category: "Other",
      description: "",
      website: "",
      instagram: "",
      twitter: "",
      facebook: "",
      logo: "",
      banner: "",
      email: "",
    },

    validationSchema: Yup.object({
      societyName: Yup.string()
        .trim()
        .min(3, "Society name must be at least 3 characters long")
        .required("Society name is required"),
      description: Yup.string()
        .trim()
        .min(50, "Society description must be at least 50 characters.")
        .required("Society description is required"),
      website: Yup.string().url("Must be a valid URL"),
      instagram: Yup.string().url("Must be a valid URL"),
      twitter: Yup.string().url("Must be a valid URL"),
      facebook: Yup.string().url("Must be a valid URL"),
      logo: Yup.string().url("Must be a valid URL"),
      banner: Yup.string().url("Must be a valid URL"),
      email: Yup.string()
        .email("Must be a valid email address")
        .required("Must be a valid email address"),
    }),

    onSubmit: async (values) => {
      console.log(values);

      await fetch(process.env.REACT_APP_API_URL + "/societies/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtController.getToken()}`,
        },
        body: JSON.stringify(values),
      })
        .then((res) => {
          console.log(res);
          res.json().then((data) => {
            console.log(data);
            const societyId = data.society.id;
            window.location.href = `/society/${societyId}`;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    
    <div className="page-container">
      <div className="underlay"></div>
      <div className="container">
        <h1>Create Society</h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="field">
            <label htmlFor="societyName">Society Name</label>
            <input
              name="societyName"
              value={formik.values.societyName}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
            />
            {formik.touched.societyName && formik.errors.societyName ? (
              <label className="errortext" htmlFor="societyName">
                {formik.errors.societyName}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          <div className="field">
            <label>Select a category</label>
            <select
              id="category"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              className="form-select"
            >
              <option defaultValue>Other</option>
              <option>Academic</option>
              <option>Social</option>
              <option>Sports</option>
            </select>
          </div>

        {/*Email below*/}
        <div className="field">
          <label htmlFor="email">Society Email</label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <label className="errortext" htmlFor="email">
              {formik.errors.email}
              <br />
            </label>
          ) : (
            ""
          )}
        </div>
        {/*Email Above */}

          {/* Socials below*/}
          <h5>Socials</h5>

          <div className="field">
            <label htmlFor="website">Website</label>
            <input
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
            />
            {formik.touched.website && formik.errors.website ? (
              <label className="errortext" htmlFor="website">
                {formik.errors.website}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          <div className="field">
            <label htmlFor="instagram">Instagram</label>
            <input
              name="instagram"
              value={formik.values.instagram}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
            />
            {formik.touched.instagram && formik.errors.instagram ? (
              <label className="errortext" htmlFor="instagram">
                {formik.errors.instagram}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          <div className="field">
            <label htmlFor="twitter">Twitter</label>
            <input
              name="twitter"
              value={formik.values.twitter}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
            />
            {formik.touched.twitter && formik.errors.twitter ? (
              <label className="errortext" htmlFor="twitter">
                {formik.errors.twitter}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          <div className="field">
            <label htmlFor="facebook">Facebook</label>
            <input
              name="facebook"
              value={formik.values.facebook}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
            />
            {formik.touched.facebook && formik.errors.facebook ? (
              <label className="errortext" htmlFor="facebook">
                {formik.errors.facebook}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          {/* Image links below*/}
          <h5>Images</h5>
          <small id="imageHelp" className="form-text text-muted">
            You must enter a link to the images
          </small>
          <div className="field">
            <label htmlFor="logo">Society Logo</label>
            <input
              name="logo"
              value={formik.values.logo}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
            />
            {formik.touched.logo && formik.errors.logo ? (
              <label className="errortext" htmlFor="logo">
                {formik.errors.logo}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          <div className="field">
            <label htmlFor="banner">Society Banner</label>
            <input
              name="banner"
              value={formik.values.banner}
              onChange={formik.handleChange}
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
            />
            {formik.touched.banner && formik.errors.banner ? (
              <label className="errortext" htmlFor="banner">
                {formik.errors.banner}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          <div className="field">
            <label htmlFor="description">Society Description</label>
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
            {formik.touched.description && formik.errors.description ? (
              <label className="errortext" htmlFor="description">
                {formik.errors.description}
                <br />
              </label>
            ) : (
              ""
            )}
          </div>

          <button className="button">Create Society</button>
        </form>
      </div>
    </div>
  );
}

export default CreateSocietyForm;
