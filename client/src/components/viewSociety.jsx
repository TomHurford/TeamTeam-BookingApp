import React from "react";
import { useParams } from "react-router-dom";

const ViewSociety = () => {
  const { name } = useParams();
  return <h1>Society: {name}</h1>;
};

export default ViewSociety;
