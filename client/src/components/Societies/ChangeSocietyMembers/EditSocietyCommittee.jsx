import React, { useEffect, useState } from "react";

import Member from "./Member";
import AddCommitteeMember from "./AddCommitteeMember";

const jwtController = require("../../../utils/jwt.js");
import axios from "axios";

const EditSocietyCommittee = (props) => {
  // const [members, setMembers] = React.useState([
  //   {
  //     email: "nid@nid.com",
  //     userId: 1,
  //     role: "admin",
  //   },

  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5001/societies/getCommitteeMembers",
          {
            societyId: props.societyId,
          }
        );
        setMembers(response.data.committee);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props.societyId]);

  useEffect(() => {
    setMembers(members);
  }, [members]);

  const [newMemberId, setNewMemberId] = React.useState(4);

  const handleRemoveMember = (id) => {
    // if (members.length > 1) {
    //   setMembers((prevMembers) => prevMembers.filter((m) => m.userId !== id));
    // } else {
    //   console.log("Committee must have at least one member");
    // }
    // const data = {
    //   userId: parseInt(members.userId),
    // };
    // console.log(members);
    // console.log(jwtController.getToken());
    // console.log(data);
    // fetch("http://localhost:5001/societies/removeCommitteeMember", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + jwtController.getToken(),
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((res) => res.status)
    //   .then((status) => {
    //     if (status === 200) {
    //       alert("Member deleted successfully!");
    //     } else {
    //       alert("Error removing member");
    //     }
    //   });
  };

  const handleAddMember = (email) => {
    const data = {
      email: email,
      societyId: parseInt(props.societyId),
      role: "blahblah",
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

    setMembers((prevMembers) => [
      ...prevMembers,
      {
        email: email,
        userId: newMemberId,
        role: "blahblah",
      },
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
