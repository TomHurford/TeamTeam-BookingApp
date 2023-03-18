import React from "react";
import "../styles/Privacy.css";
//A component for Contact page to be added

function Privacy() {
  return (
    <div className="page-container">
      <div className="underlay"></div>
      <h1 className="title">Privacy</h1>
      <p className="data">
        <center>
          At our platform, we take your privacy seriously and are committed to
          protecting your personal information. This privacy policy outlines the
          types of information we collect, how we use it, and the measures we
          take to safeguard it.
          <br />
          <br />
          We collect personal information such as your name, email address, and
          payment information when you sign up for an account, purchase tickets,
          or use our platform. This information is used to process your
          transactions, provide customer support, and improve our services.
          <br />
          <br />
          We may also collect information about your use of our platform,
          including IP address, browser type, and device information. This
          information is used to analyze and improve our services and to
          personalize your experience on our platform.
          <br />
          <br />
          We may share your personal information with third-party service
          providers, such as payment processors and marketing partners, to
          facilitate transactions and improve our services. We will never sell
          your personal information to third parties.
          <br />
          <br />
          We take appropriate measures to safeguard your personal information,
          including encryption, firewalls, and secure servers. We also require
          our third-party service providers to implement appropriate security
          measures to protect your personal information.
          <br />
          <br />
          By using our platform, you consent to the collection and use of your
          personal information as outlined in this privacy policy. If you have
          any questions or concerns about our privacy practices, please contact
          us using the contact page.
        </center>
      </p>
    </div>
  );
}
export default Privacy;
