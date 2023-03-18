// This file contains functions that make API calls to the backend

const jwtController = require('./jwt.js');

// This function gets all events from the backend
export const getEvents = async () => {
  var events = [];
  await fetch('http://localhost:5001/events', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    events = data.events;
  })
  .catch(error => {
    console.log(error);
  })
  return events;
}

// This function gets a specific event from the backend
export const getEventById = async (eventId) => {
  var event = {};
  if(jwtController.getToken() != null){
    await fetch('http://localhost:5001/events/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtController.getToken()
      },
      body: JSON.stringify({"eventId": eventId})
    })
    .then(response => response.json())
    .then(data => {
      event = data;
    })
    .catch(error => {
      console.log(error);
    })
  } else {
    await fetch('http://localhost:5001/events/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"eventId": eventId})
    })
    .then(response => response.json())
    .then(data => {
      event = data;
    })
    .catch(error => {
      console.log(error);
    })
  }
  return event;
}