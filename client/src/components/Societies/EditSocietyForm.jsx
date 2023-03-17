import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import EditSocietyCommittee from "./ChangeSocietyMembers/EditSocietyCommittee";
import "../../styles/Society.css";
const jwtController = require("../../utils/jwt.js");
import { useParams } from "react-router-dom";

function EditSocietyForm() {
  const formik = useFormik({
    initialValues: {
      societyId: parseInt(useParams().id),
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
      societyId: Yup.number(),
      societyName: Yup.string(),
      societyEmail: Yup.string().email("Must be a valid email address"),
      description: Yup.string().min(
        50,
        "Society description must be at least 50 characters."
      ),
      website: Yup.string().url("Must be a valid URL"),
      instagram: Yup.string().url("Must be a valid URL"),
      twitter: Yup.string().url("Must be a valid URL"),
      facebook: Yup.string().url("Must be a valid URL"),
      logo: Yup.string().url("Must be a valid URL"),
      banner: Yup.string().url("Must be a valid URL"),
    }),

    onSubmit: (values) => {
      if (
        values.societyName === "" &&
        values.category === "" &&
        values.description === "" &&
        values.website === "" &&
        values.instagram === "" &&
        values.twitter === "" &&
        values.facebook === "" &&
        values.logo === "" &&
        values.banner === "" &&
        values.societyEmail === ""
      ) {
        alert("Please fill in at least one field");
      } else {
        const data = {
          societyId: parseInt(values.societyId),
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
            Authorization: "Bearer " + jwtController.getToken(),
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
          });
      }
    },
  });

  return (
    <div style={{ marginTop: "60px", marginLeft: "8px" }}>
      <h1>Edit Society</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
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

        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="email">Society Email</label>
          <input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="text"
            className="form-control"
            onBlur={formik.handleBlur}
          />
          {formik.touched.societyEmail && formik.errors.societyEmail ? (
            <label className="errortext" htmlFor="societyEmail">
              {formik.errors.societyEmail}
              <br />
            </label>
          ) : (
            ""
          )}
        </div>
        {/*Email Above */}

        {/* Socials below*/}
        <h5>Socials</h5>

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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
        <div className="form-group">
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

        <div className="form-group">
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

        <div className="form-group">
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

        <button className="btn btn-primary">Create Society</button>
      </form>

      <EditSocietyCommittee societyId={formik.values.societyId} />
    </div>
  );
}

export default EditSocietyForm;
