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

  const handleRemoveMember = async (userId) => {
    const data = { userId: userId, societyId: props.societyId };
    await fetch("http://localhost:5001/societies/removeCommitteeMember", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtController.getToken(),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User removed from committee") {
          alert("Member deleted successfully!");
          if (members.length > 1) {
            setMembers((prevMembers) =>
              prevMembers.filter((m) => m.userId !== userId)
            );
          } else {
            console.log("Committee must have at least one member");
          }
        } else {
          alert(data.message);
        }
      });
  };

  const handleAddMember = async (email) => {
    const data = {
      email: email,
      societyId: parseInt(props.societyId),
      role: "Committee Member",
    };

    var resUserId = 0;

    await fetch("http://localhost:5001/societies/addCommitteeMember", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtController.getToken(),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "User added to committee") {
          alert("Member added successfully!");
        } else {
          alert(data.message);
          return;
        }
        resUserId = data.userId;
        setMembers((prevMembers) => [
          ...prevMembers,
          {
            email: email,
            userId: resUserId,
            role: "Committee Member",
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMakePresident = async (userId) => {
    const data = {
      societyId: parseInt(props.societyId),
      userId: parseInt(userId),
    };

    await fetch("http://localhost:5001/societies/changePresident", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtController.getToken(),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "President changed") {
          alert("President changed successfully!");
        } else {
          alert(data.message);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      style={{
        marginTop: "20px",
        marginBottom: "20px",
        borderColor: "gray",
        width: "50%",
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
          makePresident={handleMakePresident}
        />
      ))}
      <AddCommitteeMember addMember={handleAddMember} />
    </div>
  );
};

export default EditSocietyCommittee;
