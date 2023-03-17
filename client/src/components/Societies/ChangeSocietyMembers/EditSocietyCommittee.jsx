import React from "react";

import Member from "./Member";
import AddCommitteeMember from "./AddCommitteeMember";
const jwtController = require("../../../utils/jwt.js");

const EditSocietyCommittee = (props) => {
  const [members, setMembers] = React.useState([
    {
      email: "nid@nid.com",
      userId: 1,
      societyId: props.societyId,
      role: "admin",
    },
    { email: "hi@hi.com", userId: 2 },
    { email: "hdsdfasi@dhi.com", userId: 3 },
  ]);

  const [newMemberId, setNewMemberId] = React.useState(4);

  const handleRemoveMember = (id) => {
    if (members.length > 1) {
      setMembers((prevMembers) => prevMembers.filter((m) => m.userId !== id));
    } else {
      console.log("Committee must have at least one member");
    }
  };

  const handleAddMember = (email) => {
    setMembers((prevMembers) => [
      ...prevMembers,
      {
        email: email,
        userId: newMemberId,
        societyId: props.societyId,
        role: "newMember",
      },
    ]);
    setNewMemberId((prevId) => prevId + 1);

    const data = {
      email: email,
      userId: newMemberId,
      societyId: parseInt(props.societyId),
      role: "newMember",
    };
    console.log(jwtController.getToken());

    console.log(data);
    fetch("http://localhost:5001/societies/addCommitteeMember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtController.getToken(),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.status)
      .then((status) => {
        if (status === 200) {
          alert("Member added successfully!");
        } else {
          alert("Error adding member");
        }
      });
  };

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        borderColor: "gray",
        width: "28%",
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: "#abc4ff",
      }}
    >
      <h1
        style={{
          marginLeft: "8px",
        }}
      >
        Committee Members
      </h1>
      {members.map((member) => (
        <Member
          email={member.email}
          id={member.userId}
          key={member.userId.toString()}
          removeMember={handleRemoveMember}
        />
      ))}
      <AddCommitteeMember addMember={handleAddMember} />
    </div>
  );
};

export default EditSocietyCommittee;
