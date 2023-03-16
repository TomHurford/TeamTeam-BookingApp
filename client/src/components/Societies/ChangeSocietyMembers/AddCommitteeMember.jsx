import React from "react";
import PropTypes from "prop-types";

const AddCommitteeMember = (props) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addMember(value);
    setValue("");
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event)}
      style={{
        marginLeft: "8px",
      }}
    >
      <input
        value={value}
        type="email"
        placeholder="Enter member's email"
        onChange={(event) => setValue(event.target.value)}
        required
        style={{
          borderRadius: 3,
        }}
      />
      <button
        className="btn btn-primary"
        style={{ marginLeft: "8px", marginBottom: "8px" }}
      >
        Add Member
      </button>
    </form>
  );
};

AddCommitteeMember.propTypes = {
  addMember: PropTypes.func,
};

export default AddCommitteeMember;
