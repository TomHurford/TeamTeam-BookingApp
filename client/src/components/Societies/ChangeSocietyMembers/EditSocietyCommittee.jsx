import React from "react";

import Member from "./Member";
import AddCommitteeMember from "./AddCommitteeMember";

const EditSocietyCommittee = () => {
  const [members, setMembers] = React.useState([
    { email: "nid@nid.com", id: 1 },
    { email: "hi@hi.com", id: 2 },
    { email: "hdsdfasi@dhi.com", id: 3 },
  ]);

  const [newMemberId, setNewMemberId] = React.useState(4);

  const handleRemoveMember = (id) => {
    if (members.length > 1) {
      setMembers((prevMembers) => prevMembers.filter((m) => m.id !== id));
    } else {
      console.log("Committee must have at least one member");
    }
  };

  const handleAddMember = (email) => {
    setMembers((prevMembers) => [
      ...prevMembers,
      { email: email, id: newMemberId },
    ]);
    setNewMemberId((prevId) => prevId + 1);
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
          id={member.id}
          key={member.id.toString()}
          removeMember={handleRemoveMember}
        />
      ))}
      <AddCommitteeMember addMember={handleAddMember} />
    </div>
  );
};

export default EditSocietyCommittee;
