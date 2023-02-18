import React, { Component } from "react";
import Input from "./input";

class CreateSocietyForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Society created");
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
          <Input name="logo" value="" label="Logo Link" onChange=" " />
          <Input name="banner" value="" label="Banner Link" onChange=" " />

          <div>
            <label htmlFor="">Society Description</label>
            <textarea
              id="w3review"
              name="w3review"
              rows="8"
              cols="175"
            ></textarea>
          </div>

          <button className="btn btn-primary">Create Society</button>
        </form>
      </div>
    );
  }
}

export default CreateSocietyForm;
