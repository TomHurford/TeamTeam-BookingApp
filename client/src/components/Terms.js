import React from "react";
import "../styles/Terms.css";
//A component for Contact page to be added

function Terms() {
  return (
    <div className="page-container">
      <div className="underlay"></div>
      <h1 className="title">Terms And Conditions</h1>

      <center>
        <p>
          Welcome to our ticket selling platform. By using our platform, you
          agree to be bound by the following terms and conditions:
        </p>
        <p>
          1. User Conduct: You agree to use our platform only for lawful
          purposes and in accordance with these terms and conditions. You agree
          not to use our platform for any illegal or unauthorized purpose.
        </p>
        <p>
          2. Account Registration: You must create an account to use our
          platform. You agree to provide accurate and complete information when
          creating your account and to keep your login credentials confidential.
          You are responsible for all activity that occurs under your account.
        </p>
        <p>
          3. Event Creation and Ticket Sales: Society organizers are responsible
          for creating and managing their events on our platform. You agree to
          provide accurate and complete information when creating an event and
          to comply with all applicable laws and regulations. You are
          responsible for setting ticket prices, managing ticket inventory, and
          processing refunds.
        </p>
        <p>
          4. Payment Processing: Our platform uses third-party payment
          processors to process transactions. You agree to pay all fees
          associated with your use of our platform and to provide accurate and
          complete payment information. We reserve the right to suspend or
          terminate your account if payment is not received or is disputed.
        </p>
        <p>
          5. Intellectual Property: Our platform and all content, features, and
          functionality are owned by us or our licensors and are protected by
          intellectual property laws. You agree not to copy, modify, distribute,
          or reproduce any content from our platform without our prior written
          consent.
        </p>
        <p>
          6. Limitation of Liability: Our platform is provided on an "as is"
          basis and we make no representations or warranties regarding its
          operation or availability. We are not responsible for any damages,
          including but not limited to direct, indirect, incidental, or
          consequential damages, arising out of your use of our platform.
        </p>
        <p>
          7. Termination: We reserve the right to suspend or terminate your
          account at any time for any reason, without notice. You may also
          terminate your account at any time by contacting us.
        </p>

        <p>
          By using our platform, you agree to be bound by these terms and
          conditions. If you have any questions or concerns about these terms
          and conditions, please contact us at [insert contact information].
        </p>
      </center>
    </div>
  );
}
export default Terms;
