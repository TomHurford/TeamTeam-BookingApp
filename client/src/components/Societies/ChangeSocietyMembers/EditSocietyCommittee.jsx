import React, { useEffect, useState } from "react";
import Member from "./Member";
import AddCommitteeMember from "./AddCommitteeMember";
import axios from "axios";
const jwtController = require("../../../utils/jwt.js");

// A component for the edit society page which allows the president to edit the committee members of a society.
const EditSocietyCommittee = (props) => {
  const [members, setMembers] = useState([]);

  // Fetches the committee members from the database
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

  // Removes a committee member from the database
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

  // Adds a committee member to the database
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

  // Changes the president of the society
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
      className="center"
      style={{
        marginTop: "20px",
        padding: "10px",
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 20,
        borderStyle: "solid",
        backgroundColor: "#efedee",
        textAlign: "center",
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
