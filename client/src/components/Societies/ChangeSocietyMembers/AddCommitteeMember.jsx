import React from "react";

const AddCommitteeMember = (props) => {
  const [value, setValue] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addMember(value);
    setValue("");
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <input
        value={value}
        placeholder="Enter member's email"
        onChange={(event) => setValue(event.target.value)}
      />
      <button className="btn btn-primary" style={{ marginLeft: "8px" }}>
        Add Member
      </button>
    </form>
  );
};

export default AddCommitteeMember;
