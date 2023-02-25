import React, { Component } from "react";
import Input from "../common/Input";
import Joi from "joi-browser";
import EditSocietyCommittee from "./ChangeSocietyMembers/EditSocietyCommittee";
import '../../styles/Society.css';

class EditSocietyForm extends Component {
  state = {};
  render() {
    return (
      <div className='page-container'>
        <div className='underlay'></div>
        <div className="societyPage-container">
          <h1>Edit Society</h1>
          <form onSubmit={this.handleSubmit}>
            <fieldset disabled>
              <Input
                name="societyName"
                value=""
                label="Society Name"
                onChange=" "
              />

              <div className="form-group">
                <label htmlFor="categorySelect">Select a category</label>
                <select className="form-select" id="categorySelect">
                  <option value="1" defaultValue>
                    Sport
                  </option>
                  <option value="2">Social</option>
                  <option value="3">Academic</option>
                </select>
              </div>
            </fieldset>

            {/* Socials below*/}
            <h5>Socials</h5>
            <Input name="website" value="" label="Website" onChange=" " />
            <Input name="instagram" value="" label="Instagram" onChange=" " />
            <Input name="twitter" value="" label="Twitter" onChange=" " />
            <Input name="facebook" value="" label="Facebook" onChange=" " />

            {/* Image links below*/}
            <h5>Images</h5>
            <small id="imageHelp" className="form-text text-muted">
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
              <label htmlFor="">Society Description</label>
              <textarea
                id="societyDescription"
                className="form-control"
                name="societyDescription"
                rows="8"
                cols="173"
                style={{ marginBottom: "8px" }}
              ></textarea>
            </div>

            <button className="btn btn-primary">Save</button>
          </form>

          <EditSocietyCommittee />
        </div>
      </div>
    );
  }
}

export default EditSocietyForm;
