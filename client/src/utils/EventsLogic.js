// This file contains functions that make API calls to the backend

const axios = require('axios');
//const axios = require('axios').default;
const jwtController = require('./jwt.js');

// This function gets all events from the backend
export const getEvents = async () => {
  try{
    const response = await axios.get('http://localhost:5001/events', {})
    const eventsArray = await response.data;
    const events = eventsArray.events;
    return events;
  } catch (error) {
    console.log(error)
    return null;
  }
}

// This function gets a specific event from the backend
export const getEventById = async (eventId) => {
  console.log('err')
  try{
    // const response = await axios.post('http://localhost:5001/events', {eventId: eventId});
    const response = await fetch('http://localhost:5001/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwtController.getToken()
      },
      body: { eventId: eventId }
    })
    console.log(response);
    const event = await response.data;
    return event;
  } catch (error) {
    console.log(error)
    return null;
  }
}

/*
export const checkPrivileges = async () => {
  fetch('http://localhost:5001/events/auth', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + jwtController.getToken()
    }
  })
  .then(response => {
    console.log(response);
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  })
  .catch(error => {
    console.log(error);
  })
}
*/