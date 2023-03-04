import React from "react";
import Input from "../common/Input";
import { useFormik } from "formik";
import * as Yup from "yup";

function CreateSocietyForm() {
  const formik = useFormik({
    initialValues: {
      societyName: "",
      category: "Sports",
      description: "",
      website: "",
      instagram: "",
      twitter: "",
      facebook: "",
      logo: "",
      banner: "",
    },

    validationSchema: Yup.object({
      societyName: Yup.string().required("Society name is required"),
      description: Yup.string()
        .min(50, "Society description must be at least 50 characters.")
        .required("Society description is required"),
      website: Yup.string().url("Must be a valid URL"),
      instagram: Yup.string().url("Must be a valid URL"),
      twitter: Yup.string().url("Must be a valid URL"),
      facebook: Yup.string().url("Must be a valid URL"),
      logo: Yup.string().url("Must be a valid URL"),
      banner: Yup.string().url("Must be a valid URL"),
    }),

    onSubmit: (values) => {
      console.log("Society created");
    },
  });

  return (
    <div>
      <h1>Create Society</h1>

      <form onSubmit={formik.handleSubmit}>
        <Input
          name="societyName"
          value={formik.values.societyName}
          onChange={formik.handleChange}
          label={
            formik.touched.societyName && formik.errors.societyName
              ? formik.errors.societyName
              : "Society Name"
          }
        />

        <div className="form-group">
          <label>Select a category</label>
          <select
            id="category"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            className="form-select"
          >
            <option defaultValue>Sports</option>
            <option>Academic</option>
            <option>Social</option>
            <option>Other</option>
          </select>
        </div>

        {/* Socials below*/}
        <h5>Socials</h5>
        <Input
          name="website"
          value={formik.values.website}
          onChange={formik.handleChange}
          label={
            formik.touched.website && formik.errors.website
              ? formik.errors.website
              : "Website"
          }
          //onBlur={formik.handleBlur}
        />
        <Input
          name="instagram"
          value={formik.values.instagram}
          onChange={formik.handleChange}
          label={
            formik.touched.instagram && formik.errors.instagram
              ? formik.errors.instagram
              : "Instagram"
          }
        />
        <Input
          name="twitter"
          value={formik.values.twitter}
          onChange={formik.handleChange}
          label={
            formik.touched.twitter && formik.errors.twitter
              ? formik.errors.twitter
              : "Twitter"
          }
        />
        <Input
          name="facebook"
          value={formik.values.facebook}
          onChange={formik.handleChange}
          label={
            formik.touched.facebook && formik.errors.facebook
              ? formik.errors.facebook
              : "Facebook"
          }
        />

        {/* Image links below*/}
        <h5>Images</h5>
        <small id="imageHelp" className="form-text text-muted">
          You must enter a link to the images
        </small>
        <Input
          name="logo"
          value={formik.values.logo}
          onChange={formik.handleChange}
          label={
            formik.touched.logo && formik.errors.logo
              ? formik.errors.logo
              : "Society Logo"
          }
        />
        <Input
          name="banner"
          value={formik.values.banner}
          onChange={formik.handleChange}
          label={
            formik.touched.banner && formik.errors.banner
              ? formik.errors.banner
              : "Society Banner"
          }
        />

        <div className="form-group">
          <label
            className={`form-label ${
              formik.touched.instagram && formik.errors.description
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

        <button className="btn btn-primary">Create Society</button>
      </form>
    </div>
  );
}

export default CreateSocietyForm;
