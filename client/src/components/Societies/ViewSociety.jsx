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
const jwtController = require("../../utils/jwt.js");

function ViewSociety() {
  const [society, setSociety] = useState({});
  const [societyLinks, setSocietyLinks] = useState({});
  const [showFollowButton, setShowFollowButton] = useState(true);
  const [showUnfollowButton, setShowUnfollowButton] = useState(true);
  const [showEditButton, setShowEditButton] = useState(true);
  const [events, setEvents] = useState([]);
  const { id: societyId } = useParams();
  const data = {
    societyId: parseInt(societyId),
  };

  useEffect(() => {
    if (
      jwtController.getToken() === undefined ||
      jwtController.getToken() === null
    ) {
      axios
        .post("http://localhost:5001/societies/getSociety", {
          societyId: societyId,
        })
        .then((response) => {
          setSociety(response.data.society);
          setSocietyLinks(response.data.society.links[0]);
          setEvents(response.data.society.events);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch("http://localhost:5001/societies/getSociety", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwtController.getToken(),
        },
        body: JSON.stringify({ societyId: parseInt(societyId) }),
      })
        .then((response) => response.json())
        .then((data) => {
          setSociety(data.society);
          setSocietyLinks(data.society.links[0]);
          setEvents(data.society.events);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [societyId]);

  useEffect(() => {
    if (
      jwtController.getToken() !== undefined &&
      jwtController.getToken() !== null
    ) {
      fetch("http://localhost:5001/societies/checkUserIsMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Authorization: "Bearer " + jwtController.getToken(),
        },
        body: JSON.stringify({ societyId: parseInt(societyId) }),
      }).then((res) => {
        res.json().then((data) => {
          if (data.isMember === true) {
            setShowFollowButton(false);
            setShowUnfollowButton(true);
          } else {
            setShowFollowButton(true);
            setShowUnfollowButton(false);
          }
        });
      });
    }
  }, [societyId]);

  // useEffect(() => {
  //   fetch("http://localhost:5001/societies/getFollowedSocieties", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + jwtController.getToken(),
  //     },
  //     body: JSON.stringify(data),
  //   }).then((res) => {
  //     res.json().then((data) => {
  //       for (let i = 0; i < data.societies.length; i++) {
  //         if (data.societies[i].societyId === parseInt(societyId)) {
  //           setShowFollowButton(false);
  //         }
  //       }
  //     });
  //   });
  // }, [societyId]);

  useEffect(() => {
    if (
      jwtController.getToken() !== undefined &&
      jwtController.getToken() !== null
    ) {
      console.log();
      fetch("http://localhost:5001/societies/checkPresident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + jwtController.getToken(),
        },
        body: JSON.stringify(data),
      }).then((res) => {
        res.json().then((data) => {
          if (data.isPresident === false) {
            setShowEditButton(false);
          }
        });
      });
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

  function followSociety() {
    fetch("http://localhost:5001/societies/followSociety", {
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
          setShowFollowButton(false);
          setShowUnfollowButton(true);
          alert("Society followed successfully!");
        } else {
          alert("Error following society");
        }
      });
  }

  function unfollowSociety() {
    fetch("http://localhost:5001/societies/unFollowSociety", {
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
          setShowUnfollowButton(false);
          setShowFollowButton(true);
          alert("Society unfollowed successfully!");
        } else {
          alert("Error unfollowing society");
        }
      });
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
          <div className="socials" style={{ marginRight: "10px" }}>
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
          <a href={societyLinks.website}>{societyLinks.website}</a>
          <div>
            {jwtController.getToken() !== undefined &&
              jwtController.getToken() !== null &&
              showFollowButton && (
                <button
                  data-testid="followButton"
                  type="button"
                  className="button"
                  onClick={followSociety}
                >
                  Follow
                </button>
              )}

            {jwtController.getToken() !== undefined &&
              jwtController.getToken() !== null &&
              showUnfollowButton && (
                <button
                  type="button"
                  data-testid="unfollowButton"
                  className="button button--red"
                  onClick={unfollowSociety}
                >
                  Unfollow
                </button>
              )}
          </div>
        </div>

        <div className="events">
          <h2>Events:</h2>
          {eventsCardList(events)}
        </div>
      </div>

      <ContactSocietyForm
        societyName={society.name}
        societyEmail={society.email}
      />

      <Link to={`/edit-society/${society.id}`}>
        {society.isCommitteePresident === true && showEditButton && (
          <button type="button" className="button">
            Edit Society
          </button>
        )}
      </Link>
    </div>
  );
}

export default ViewSociety;
