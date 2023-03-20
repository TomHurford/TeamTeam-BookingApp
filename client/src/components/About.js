import React from "react";
import "../styles/About.css";
//A component for describing the website and its features to the user

function About() {
  return (
    <div className="page-container">
      <div className="underlay"></div>
      <h1 className="title1">About Us</h1>
      <h2 className="title3">Ticketopia:</h2>
      <p className="data">
        Welcome to our University Events booking System! Our platform is
        designed to provide easy access to a wide range of events for students.
        We believe that everyone in university should have the opportunity to
        attend events that interest them, and our application is designed to
        make that possible.
      </p>
      <h3 className="title3">Our Mission:</h3>
      <p className="data">
        Our mission is to create a platform where university individuals can
        browse and book events organised by various societies. We aim to provide
        an efficient and convenient booking experience, allowing users to find
        events that suit their interests and schedule.
      </p>
      <h4 className="title3">Joining Societies:</h4>
      <p className="data">
        Joining a society is easy! Simply log in to your account and navigate to
        the Societies page. There, you can view a list of available societies
        and follow the ones that interest you.
      </p>
      <h5 className="title3">Creating Societies:</h5>
      <p className="data">
        If you want to start a society, we make it easy for you. Simply navigate
        to the Societies page and click on the "Create Society" button. You will
        be prompted to enter some specific information about your society and
        yourself, and once you have completed the form, you will become the
        president.
      </p>
      <h6 className="title3">Roles of the President and Committee Members:</h6>
      <p className="data">
        As the president of a society, you have access to a range of tools to
        help you manage your organization. You can assign and remove committee
        members, edit society and event pages, and see other committee members.
        If you want to give your role to another user, you can do so at any
        time. <br></br>
        <br></br>Committee members have many of the same privileges as the
        president, but they cannot assign or remove other committee members or
        pass on roles.
      </p>
      <h1 className="title3">Making Purchases:</h1>
      <p className="data">
        To make a purchase, you must log in to your account. This ensures that
        we can keep track of your bookings and provide you with the best
        possible service. Once you are logged in, you can browse events and make
        purchases.
      </p>
      <h2 className="title3">Creating Events</h2>
      <p className="data">
        Presidents and committee members can create events from their society's
        data page. This makes it easy to schedule events and to edit them later
        if necessary.
      </p>
      <h3 className="title3">When You Need to Log In</h3>
      <p className="data">
        If you are a committee member or president, you must log in before
        editing event/society information. Additionally, you need to log in to
        make purchases.
      </p>
      <h4 className="title3">Event Capacity</h4>
      <p className="data">
        In a case that an event runs out of space, a user will not be able to
        purchase tickets anymore. <br></br>
        <br></br>At our event booking application, we are committed to making it
        easy for users to browse and book events. Whether you are looking to
        join a society, attend an event, or create your own society, we are here
        to help you every step of the way.
      </p>
    </div>
  );
}
export default About;
