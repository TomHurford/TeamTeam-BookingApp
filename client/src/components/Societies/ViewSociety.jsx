import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewSociety() {
  const [society, setSociety] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5001/societies/getSociety/${id}`)
      .then((response) => setSociety(response.data))
      .catch((error) => console.error(error));
  }, [id]);

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
