import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";

class CreateSocietyForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Society created");
  };

  schema = {
    societyName: Joi.string().required(),
  };

  render() {
    return (
      <div>
        <h1>Create Society</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="societyName"
            value=""
            label="Society Name"
            onChange=" "
          />

          <div className="form-group">
            <label for="categorySelect">Select a category</label>
            <select className="form-select" id="categorySelect">
              <option value="1" selected>
                Sport
              </option>
              <option value="2">Social</option>
              <option value="3">Academic</option>
            </select>
          </div>

          {/* Socials below*/}
          <h5>Socials</h5>
          <Input name="website" value="" label="Website" onChange=" " />
          <Input name="instagram" value="" label="Instagram" onChange=" " />
          <Input name="twitter" value="" label="Twitter" onChange=" " />
          <Input name="facebook" value="" label="Facebook" onChange=" " />

          {/* Image links below*/}
          <h5>Images</h5>
          <small id="imageHelp" class="form-text text-muted">
            You must enter a link to the images
          </small>
          <Input name="logo" value="" label="Logo" onChange=" " />
          <Input
            name="banner"
            value=""
            label="Banner"
            onChange=" 
          "
          />

          <div className="form-group">
            <label for="">Society Description</label>
            <textarea
              id="societyDescription"
              className="form-control"
              name="societyDescription"
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
}

export default CreateSocietyForm;
