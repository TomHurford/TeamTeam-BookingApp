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
          process.env.REACT_APP_API_URL + "/societies/getCommitteeMembers",
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
    await fetch(process.env.REACT_APP_API_URL + "/societies/removeCommitteeMember", {
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
            alert("Committee must have at least one member");
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

    await fetch(process.env.REACT_APP_API_URL + "/societies/addCommitteeMember", {
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

    await fetch(process.env.REACT_APP_API_URL + "/societies/changePresident", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwtController.getToken(),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
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
        width: "100%",
        borderWidth: 2,
        borderRadius: 20,
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
          email={member.user.email}
          userId={member.user.id}
          key={member.user.id.toString()}
          removeMember={handleRemoveMember}
          makePresident={handleMakePresident}
        />
      ))}
      <AddCommitteeMember addMember={handleAddMember} />
    </div>
  );
};

export default EditSocietyCommittee;
