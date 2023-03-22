import React from "react";
import "../../../styles/index.css";

const Member = (props) => {
  return (
    <div
      style={{
        marginLeft: "8px",
      }}
    >
      <span>
        <button
          className="button button--red"
          onClick={() => props.removeMember(props.userId)}
          style={{ marginBottom: "8px", marginRight: "8px" }}
        >
          Remove
        </button>
        {`   ${props.email}`}
        <button
          className="button button--green"
          onClick={() => props.makePresident(props.userId)}
          style={{ marginBottom: "8px", marginLeft: "8px" }}
        >
          Make President
        </button>
      </span>
    </div>
  );
};

export default Member;
