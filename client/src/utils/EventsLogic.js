// This file contains functions that make API calls to the backend
const axios = require('axios').default;

// This function gets all events from the backend
export const getEvents = async () => {
  try{
    const response = await axios.get('http://localhost:5001/events')
    const eventsArray = await response.data;
    const events = eventsArray.events;
    return events;
  } catch (error) {
    return null;
  }
}

// This function gets a specific event from the backend
export const getEventById = async (eventId) => {
  try{
    const response = await axios.post('http://localhost:5001/events', {eventId: eventId});
    const event = await response.data;
    return event;
  } catch (error) {
    return null;
  }
}