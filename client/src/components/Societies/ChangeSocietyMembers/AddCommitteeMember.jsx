import { useState } from 'react';
import PropTypes from 'prop-types';

const AddCommitteeMember = (props) => {
  const [value, setValue] = useState("");

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

AddCommitteeMember.propTypes = {
  addMember: PropTypes.func,
};

export default AddCommitteeMember;
