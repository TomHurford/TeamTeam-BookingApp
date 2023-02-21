// This file contains functions that make API calls to the backend

// This function gets all events from the backend
export const getEvents = async () => {
  const response = await fetch('http://localhost:5001/events', 
    {
      method: 'GET',
      mode: 'cors', 
      credentials: 'same-origin'
    }
  );
  const data = await response.json();
  const events = data.events;
  return events;
}

// This function gets a specific event from the backend
export const getEventById = async (eventId) => {
  const response = await fetch('http://localhost:5001/events', 
    {
      method: 'POST',
      mode: 'cors', 
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({"eventId": eventId})
    }
  );
  const event = await response.json();
  return event;
}

