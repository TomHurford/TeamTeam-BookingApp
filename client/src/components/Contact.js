import React from "react";
import "../styles/Contact.css";
import ContactForm from "./ContactForm";
//A component for the contact page. It contains the contact form.

function Contact() {
  return (
    <div className="page-container">
      <div className="underlay"></div>
      <ContactForm />
    </div>
  );
}
export default Contact;
