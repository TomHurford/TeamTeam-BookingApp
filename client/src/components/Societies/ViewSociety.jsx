import React, { useEffect, useState } from "react";
import Event from "../Events/Event";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import ContactSocietyForm from "./ContactSocietyForm";
import { Link } from "react-router-dom";
import "../../styles/index.css";
const jwtController = require('../../utils/jwt.js');

function ViewSociety() {
  const [society, setSociety] = useState({});
  const [societyLinks, setSocietyLinks] = useState({});
  const [events, setEvents] = useState([]);
  const { id: societyId } = useParams();

  useEffect(() => {
    if(jwtController.getToken() === undefined || jwtController.getToken() === null){
    axios
      .post("http://localhost:5001/societies/getSociety", {
        societyId: societyId,
      })
      .then((response) => {
        setSociety(response.data.society);
        setSocietyLinks(response.data.society.links[0]);
        setEvents(response.data.society.events);
        // console.log(response.data.society.events);
      })
      .catch((error) => {
        console.log(error);
      });}
      else{
        fetch('http://localhost:5001/societies/getSociety', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtController.getToken()
          },
          body: JSON.stringify({"societyId": parseInt(societyId)})
        })
        .then(response => response.json())
        .then(data => {
          setSociety(data.society);
          setSocietyLinks(data.society.links[0]);
          setEvents(data.society.events);
          // console.log(data.society.events);
        })
        .catch(error => {
          console.log(error);
        })
      }
  }, [societyId]);

  function societyEventClick(eventId) {
    window.location.href = "/event-details?eventId=" + eventId;
  }
  //Render the events for the particular society
  function eventsCardList(events) {
    return (
      <div className="events" data-testid="events-list">
        {events.map((event) => (
          <div
            data-testid={"event" + event.id}
            className="eventCard"
            key={event.id}
            onClick={() => societyEventClick(event.id)}
          >
            <Event details={event.id} specificEvent={event} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="page-container" id="societyPage">
      <div className="underlay"></div>

      <div className="header">
        <div
          className="image"
          style={{ backgroundImage: `url(${societyLinks.banner})` }}
        >
          <div className="bannerOverlay"></div>
        </div>
        <div className="identity">
          <div className="icon">
            <div
              className="logo"
              style={{ backgroundImage: `url(${societyLinks.logo})` }}
            ></div>
          </div>
          <div className="name">{society.name}</div>
          <div className="socials">
            <a href={societyLinks.facebook} className="socialCircle">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png"
                alt="facebook"
              />
            </a>
            <a href={societyLinks.twitter} className="socialCircle">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
                alt="twitter"
              />
            </a>
            <a href={societyLinks.instagram} className="socialCircle">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                alt="instagram"
              />
            </a>
            <a href={societyLinks.website} className="socialCircle">
              <img
                src="https://w7.pngwing.com/pngs/549/715/png-transparent-web-development-logo-website-web-design-symmetry-internet.png"
                alt="website"
              />
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
        </div>

        <div className="events">
          <h2>Events:</h2>
          {eventsCardList(events)}
        </div>
      </div>

      <ContactSocietyForm societyName={society.name} />
      {/* {console.log(society.isCommitteePresident)}
      {console.log(jwtController.getToken())} */}

      { society.isCommitteePresident === true &&
      (<Link to={`/edit-society/${society.id}`}>
        <button className="button">Edit Society</button>
      </Link>)
      }
    </div>
  );
}

export default ViewSociety;
