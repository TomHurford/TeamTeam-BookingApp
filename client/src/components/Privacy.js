import React from "react";
import "../styles/Privacy.css";
//A component for providing privacy information to the user about our application.

function Privacy() {
  return (
    <div className="page-container">
      <div className="underlay"></div>
      <h1 className="title">Privacy</h1>
      <p className="data">
        Our event booking application values your privacy and is committed to
        protecting your personal information. We understand the importance of
        privacy and aim to be transparent in how we collect, use, and protect
        your personal information.
        <br></br>
        <h2>What information do we collect?</h2>
        <br></br>
        When you use our application, we collect information about you such as
        your name and email address. We may also collect information about your
        device, browser, and IP address. This information is collected through
        cookies and other tracking technologies.
        <br></br>
        <h2>How do we use your information?</h2>
        <br></br>
        We use your information to provide you with a better user experience, to
        process your bookings and purchases, and to communicate with you about
        our services. We may also use your information to analyze user behavior
        and improve our application.
        <br></br>
        <h2>How do we protect your information?</h2>
        <br></br>
        We take appropriate measures to protect your information from
        unauthorized access, alteration, disclosure, or destruction. We use
        secure servers, encryption, and other security measures to protect your
        personal information.
        <br></br>
        <h2>Do we share your information?</h2>
        <br></br>
        We do not share your personal information with third parties for
        marketing purposes. We may also share your information if required by
        law or in the event of a merger or acquisition.
        <br></br>
        <h2>Cookies</h2>
        <br></br>
        Our application uses cookies to improve your user experience and to
        collect information about your usage of our application. Cookies are
        small files stored on your device that allow us to remember your
        preferences and provide a better user experience.
        <br></br>
        <h2>Token</h2>
        <br></br>
        Our application uses tokens to authenticate users and protect user data.
        Tokens are small pieces of data that are stored on your device and are
        used to verify your identity when you log in or make purchases.{" "}
        <br></br>Tokens do not contain personal information but are used to
        protect personal information by ensuring that only authenticated users
        can access it.
        <br></br>
        Overall, we take your privacy seriously and strive to protect your
        personal information. If you have any questions or concerns about our
        privacy policy or how we handle your information, please do not hesitate
        to contact us.
      </p>
    </div>
  );
}
export default Privacy;
