import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ContactSocietyForm from "./ContactSocietyForm";

function ViewSociety() {
  const [society, setSociety] = useState({});
  const [societyLinks, setSocietyLinks] = useState({});
  const { id: societyId } = useParams();

  useEffect(() => {
    axios
      .post("http://localhost:5001/societies/getSociety", {
        societyId: societyId,
      })
      .then((response) => {
        setSociety(response.data.society);
        setSocietyLinks(response.data.society.links[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [societyId]);

  return (
    <div>
      <div
        style={{
          borderColor: "gray",
          borderWidth: 2,
          marginTop: "20px",
          marginBottom: "20px",
          borderRadius: 20,
          backgroundColor: "#abc4ff",
        }}
      >
        <div style={{ marginLeft: "8px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h2>{society.name}</h2>
            <button className="btn btn-primary" style={{ marginLeft: "15px" }}>
              Follow
            </button>
          </div>
          <p>{society.description}</p>
          <p>
            <strong>Category:</strong> {society.category}
          </p>
          <p>
            <strong>Followers:</strong> {society.members}
          </p>
          <h3>Social Links:</h3>
          <p>
            <strong> Website:</strong>{" "}
            <a href={societyLinks.website}>{societyLinks.website}</a>
          </p>
          <a href={societyLinks.instagram}>
            <FontAwesomeIcon
              icon={faInstagram}
              size="3x"
              style={{ marginBottom: "7px" }}
            />
          </a>
          <a href={societyLinks.twitter}>
            <FontAwesomeIcon
              icon={faTwitter}
              size="3x"
              style={{ marginLeft: "10px", marginBottom: "7px" }}
            />
          </a>
          <a href={societyLinks.facebook}>
            <FontAwesomeIcon
              icon={faFacebook}
              size="3x"
              style={{ marginLeft: "10px", marginBottom: "7px" }}
            />
          </a>
          <h2>Events:</h2>
        </div>
      </div>

      <ContactSocietyForm societyName={society.name} />
    </div>
  );
}

export default ViewSociety;
