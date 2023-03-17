import React, { useEffect, useState } from "react";

import Member from "./Member";
import AddCommitteeMember from "./AddCommitteeMember";

const jwtController = require("../../../utils/jwt.js");
import axios from "axios";

const EditSocietyCommittee = (props) => {
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

  const handleRemoveMember = (userId) => {
    const data = { userId: userId, societyId: props.societyId };
    fetch("http://localhost:5001/societies/removeCommitteeMember", {
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
          alert("Member deleted successfully!");
          if (members.length > 1) {
            setMembers((prevMembers) =>
              prevMembers.filter((m) => m.userId !== userId)
            );
          } else {
            console.log("Committee must have at least one member");
          }
        } else {
          alert("Error removing member");
        }
      });
  };

  const handleAddMember = (email) => {
    const data = {
      email: email,
      societyId: parseInt(props.societyId),
      role: "Committee Member",
    };

    var resUserId = 0;

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
          setMembers((prevMembers) => [
            ...prevMembers,
            {
              email: email,
              userId: resUserId,
              role: "Committee Member",
            },
          ]);
        } else if (status === 404) {
          alert("User does not exist");
          return;
        } else if (status === 400) {
          alert("User is already a committee member");
          return;
        } else if (status === 401) {
          alert("You are a not a committee member");
          return;
        } else if (status === 402) {
          alert("Only the president is able to update the committee");
          return;
        } else {
          alert("Error adding member");
          return;
        }
      })
      .then((res) => res.json())
      .then((data) => {
        resUserId = data.userId;
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
          userId={member.userId}
          key={member.userId.toString()}
          removeMember={handleRemoveMember}
        />
      ))}
      <AddCommitteeMember addMember={handleAddMember} />
    </div>
  );
};

export default EditSocietyCommittee;
