import React from "react";
import PropTypes from "prop-types";
import "../../../styles/index.css";

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
        //  marginTop: "20px"
      }}
    >
      <input
        value={value}
        type="email"
        placeholder="Enter member's email"
        onChange={(event) => setValue(event.target.value)}
        required
        className="addmemberinput"
      />
      <button
        className="button"
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
