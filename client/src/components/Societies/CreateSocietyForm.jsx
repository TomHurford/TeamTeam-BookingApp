import React, { Component } from "react";
import Input from "../common/Input";
import Joi from "joi-browser";

class CreateSocietyForm extends Component {
  state = {
    society: {
      name: "",
      category: "",
      description: "",
      website: "",
      instagram: "",
      twitter: "",
      facebook: "",
      logo: "",
      banner: "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Society created");
  };

  handleChange = ({ currentTarget: input }) => {
    const society = { ...this.state.society };
    society[input.name] = input.value;
    this.setStae({ society });
  };

  render() {
    const { society } = this.state;
    return (
      <div>
        <h1>Create Society</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="societyName"
            value={society.name}
            label="Society Name"
            onChange={this.handleChange}
          />

          <div className="form-group">
            <label>Select a category</label>
            <select
              value={society.category}
              onChange={this.handleChange}
              id="societyCategory"
              name="societyCategory"
              className="form-select"
            >
              <option value="1" defaultValue>
                Sports
              </option>
              <option value="2">Academic</option>
              <option value="3">Social</option>
              <option value="4">Other</option>
            </select>
          </div>

          {/* Socials below*/}
          <h5>Socials</h5>
          <Input
            name="societyWebsite"
            value={society.website}
            label="Society Website"
            onChange={this.handleChange}
          />
          <Input
            name="instagram"
            value={society.instagram}
            label="Society Instagram"
            onChange={this.handleChange}
          />
          <Input
            name="twitter"
            value={society.twitter}
            label="Society Twitter"
            onChange={this.handleChange}
          />
          <Input
            name="facebook"
            value={society.facebook}
            label="Society Facebook"
            onChange={this.handleChange}
          />

          {/* Image links below*/}
          <h5>Images</h5>
          <small id="imageHelp" className="form-text text-muted">
            You must enter a link to the images
          </small>
          <Input
            name="societyLogo"
            value={society.logo}
            label="Society Logo"
            onChange={this.handleChange}
          />
          <Input
            name="societyBanner"
            value={society.banner}
            label="Society Banner"
            onChange={this.handleChange}
          />

          <div className="form-group">
            <label htmlFor="">Society Description</label>
            <textarea
              id="societyDescription"
              name="societyDescription"
              value={society.description}
              className="form-control"
              type="text"
              onChange={this.handleChange}
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
