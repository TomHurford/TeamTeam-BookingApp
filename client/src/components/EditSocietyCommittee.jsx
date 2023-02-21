import React, { Component } from "react";

const Header = () => {
  return (
    <header>
      <h1>Committee Members</h1>
    </header>
  );
};

const Member = (props) => {
  return (
    <div className="member">
      <span className="member-email">
        <button
          className="btn btn-danger"
          onClick={() => props.removeMember(props.id)}
        >
          Remove
        </button>
        {props.email}
      </span>
    </div>
  );
};

class EditSocietyCommittee extends Component {
  state = {
    members: [
      { email: "nid@nid.com", id: 1 },
      { email: "hi@hi.com", id: 2 },
      { email: "hdsdfasi@dhi.com", id: 3 },
    ],
  };

  handleRemoveMember = (id) => {
    this.setState((prevState) => {
      if (prevState.members.length > 1) {
        return {
          members: prevState.members.filter((m) => m.id !== id),
        };
      } else {
        console.log("At least one committee member required");
      }
    });
  };

  render() {
    return (
      <div className="memberDisplay">
        <Header />
        {this.state.members.map((member) => (
          <Member
            email={member.email}
            id={member.id}
            key={member.id.toString()}
            removeMember={this.handleRemoveMember}
          />
        ))}
      </div>
    );
  }
}

export default EditSocietyCommittee;
