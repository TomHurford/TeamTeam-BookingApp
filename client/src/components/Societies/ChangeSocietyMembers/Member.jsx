import React from "react";

const Member = (props) => {
  return (
    <div>
      <span>
        <button
          className="btn btn-danger"
          onClick={() => props.removeMember(props.id)}
          style={{ marginBottom: "8px" }}
        >
          Remove
        </button>
        {`   ${props.email}`}
      </span>
    </div>
  );
};

export default Member;
