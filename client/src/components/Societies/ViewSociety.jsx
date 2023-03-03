import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewSociety() {
  const [society, setSociety] = useState({});
  const { id: societyId } = useParams();

  useEffect((society) => {
    axios.post('http://localhost:5001/societies/getSociety', {
      societyId: societyId
    })
      .then(response => {
        setSociety(response.data.society);
      })
      .catch(error => {
        console.log(error);
      });
  }, [societyId]);

  return (
    <div>
      <h2>{society.name}</h2>
      <p>{society.description}</p>
      <p>Category: {society.category}</p>
      <p>Followers: {society.members}</p>
    </div>
  );
}

export default ViewSociety;
