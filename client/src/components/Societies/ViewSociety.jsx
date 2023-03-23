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

// A component for the view society page which allows the user to view the details of a society.
function ViewSociety() {
  const [society, setSociety] = useState({});
  const [followersCount, setFollowersCount] = useState(0);
  const [societyLinks, setSocietyLinks] = useState({});
  const [events, setEvents] = useState([]);
  const { id: societyId } = useParams();

  // State variables for the buttons on the page to be shown or hidden depending on the user's role.
  const [showFollowButton, setShowFollowButton] = useState(true);
  const [showUnfollowButton, setShowUnfollowButton] = useState(true);
  const [showEditButton, setShowEditButton] = useState(true);

  const data = {
    societyId: parseInt(societyId),
  };

  useEffect(() => {
    if (
      jwtController.getToken() === undefined ||
      jwtController.getToken() === null
    ) {
      axios
        .post(process.env.REACT_APP_API_URL + "/societies/getSociety", {
          societyId: societyId,
        })
        .then((response) => {
          setSociety(response.data.society);
          setSocietyLinks(response.data.society.links[0]);
          setEvents(response.data.society.events);
          setFollowersCount(response.data.society.members);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      fetch(process.env.REACT_APP_API_URL + "/societies/getSociety", {
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
          setFollowersCount(data.society.members);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [societyId]);

  // Check if the user is a follower of the society
  useEffect(() => {
    if (
      jwtController.getToken() !== undefined &&
      jwtController.getToken() !== null
    ) {
      fetch(process.env.REACT_APP_API_URL + "/societies/checkUserIsMember", {
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

  // Check if the user is the president of the society
  useEffect(() => {
    if (
      jwtController.getToken() !== undefined &&
      jwtController.getToken() !== null
    ) {
      fetch(process.env.REACT_APP_API_URL + "/societies/checkPresident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwtController.getToken(),
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
    fetch(process.env.REACT_APP_API_URL + "/societies/followSociety", {
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
          setFollowersCount(followersCount + 1);
          alert("Society followed successfully!");
        } else {
          alert("Error following society");
        }
      });
  }

  function unfollowSociety() {
    fetch(process.env.REACT_APP_API_URL + "/societies/unFollowSociety", {
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
          setFollowersCount(followersCount - 1);
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
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ color: "#1877f2" }}
                size="3x"
              />
            </a>
            <a href={societyLinks.twitter} className="socialCircle">
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ color: "#1da1f2" }}
                size="3x"
              />
            </a>
            <a href={societyLinks.instagram} className="socialCircle">
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ color: "#e1306c" }}
                size="3x"
              />
            </a>
          </div>
        </div>
      </div>

      <div className="body">
        {society.isCommitteePresident === true && showEditButton && (
          <Link to={`/edit-society/${society.id}`}>
            <button type="button" className="button">
              Edit Society
            </button>
          </Link>
        )}
        <div className="description">
          <p>{society.description}</p>
          <p>
            <strong>Category:</strong> {society.category}
          </p>
          <p>
            <strong>Followers:</strong> {followersCount}
          </p>
          <a href={societyLinks.website}>{societyLinks.website}</a>
          {jwtController.getToken() !== undefined &&
            jwtController.getToken() !== null &&
            showEditButton && (
              <p>
                <strong>{`Society ID: ${society.id}`}</strong>
              </p>
            )}
          <div>
            {jwtController.getToken() !== undefined &&
              jwtController.getToken() !== null &&
              showFollowButton && (
                <button
                  data-testid="followButton"
                  type="button"
                  className="button"
                  onClick={followSociety}
                  style={{ marginTop: "10px" }}
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
                  style={{ marginTop: "10px" }}
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
    </div>
  );
}

export default ViewSociety;
