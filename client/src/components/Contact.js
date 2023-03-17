import React from "react";
import "../styles/Contact.css";
import ContactForm from "./ContactForm";
//A component for Contact page to be added

function Contact() {
  return (
    <div className="page-container">
      <div className="underlay"></div>
      <h1 className="title">Who are we?</h1>
      <p className="data">
        <center>
          Welcome to Ticketopia, a ticket selling platform, designed
          specifically for university societies! Our mission is to provide a
          simple and effective way for societies to create events and sell
          tickets online.
          <br />
          We understand the importance of a well-organized event, and the hassle
          of managing ticket sales manually. That's why we've created a
          user-friendly platform that allows societies to easily create and
          manage their events.
          <br />
          With our platform, societies can easily set up an event page,
          customize ticket options, and track ticket sales in real-time.
          <br />
          Our team is dedicated to providing excellent customer support,
          ensuring that your society has a seamless experience on our platform.
          We're always available to answer any questions or address any concerns
          that you may have.
          <br />
          So whether you're planning a fundraising event, a social gathering, or
          a cultural celebration, our platform is here to help. Join our growing
          community of university societies today and start creating
          unforgettable events with ease!
        </center>
      </p>

      <ContactForm />
    </div>
  );
}
export default Contact;
