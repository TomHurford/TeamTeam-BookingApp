import React from "react";

const Input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor="props.name">{props.label}</label>
      <input
        autoFocus
        value={props.value}
        id="societyName"
        type="text"
        className="form-control"
      />
    </div>
  );
};

export default Input;
