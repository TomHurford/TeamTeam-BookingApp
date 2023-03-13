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
    <div className="page-container" id="societyPage">
      <div className="underlay"></div>
      

      <div className="header">
        <div className="image" style={{backgroundImage: `url(${societyLinks.banner})`}}><div className="bannerOverlay"></div>        
        </div>
        <div className="identity">
          <div className="icon"><div className="logo" style={{backgroundImage: `url(${societyLinks.logo})`}}></div></div>
          <div className="name" >{society.name}</div>
          <div className="socials">
            <a href={societyLinks.facebook} className="socialCircle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png" alt="facebook" />
            </a>
            <a href={societyLinks.twitter} className="socialCircle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png" alt="twitter" />
            </a>
            <a href={societyLinks.instagram} className="socialCircle">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png" alt="instagram" />
            </a>
            <a href={societyLinks.website} className="socialCircle">
              <img src="https://w7.pngwing.com/pngs/549/715/png-transparent-web-development-logo-website-web-design-symmetry-internet.png" alt="website" />
            </a>
          </div>
        </div>
      </div>

      <div className="body">

        <div className="description">
          <p>{society.description}</p>
          <p>
            <strong>Category:</strong> {society.category}
          </p>
          <p>
            <strong>Followers:</strong> {society.members}
          </p>
          <h2>Events:</h2>
        </div>
      </div>

    </div>
  );
}

export default ViewSociety;
