// EVENTS CONTROLLER
const prisma = require('../../prisma/prisma.js');
const auth = require('../utils/jwt_auth.js');

/**
 * Get all events
 * @param {Request} req The request object
 * @param {Respon} res The response object
 */
async function getEvents(req, res) {
  try {
    // Authenticate the user
    // const decoded = await auth.authenticate(req);
    // Get all events
    const events = await prisma.event.findMany();
    const arr = [];
    events.map(async (event) => {
      event.society = await prisma.society.findFirst(event.societyId);
      arr.push(event);
    });
    console.log(arr);
    res.status(200).send({events: events});
  } catch (err) {
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
  // const events = await prisma.event.findMany()
  // res.status(200).send({events: events})
}

/**
 * Get an event by id
 * @param {Request} req The request object
 * @param {Respon} res The response object
 */
async function getEventById(req, res) {
  try {
    // Authenticate the user
    // const decoded = await auth.authenticate(req);

    // Get the event
    const event = await prisma.event.findUnique({
      where: {
        id: req.body.eventId,
      },
    });

    const ticketTypes = await prisma.ticketType.findMany({
      where: {
        event: event,
      },
    });

    const society = await prisma.society.findUnique({
      where: {
        id: event.societyId,
      },
    });

    const societyLinks = await prisma.societyLinks.findUnique({
      where: {
        societyId: event.societyId,
      },
    });

    res.status(200).send({
      event: event,
      ticket_types: ticketTypes,
      society: society,
      societyLinks: societyLinks,
    });
  } catch (err) {
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
}

/**
 * Create an event
 * @param {Request} req The request object
 * @param {Respon} res The response object
 */
async function createEvent(req, res) {
  try {
    // Authenticate the user
    const decoded = await auth.authenticate(req);

    // Check that the request body is valid i.e. has all the required fields
    // name, description, date, location, societyId
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.date ||
      !req.body.location ||
      !req.body.societyId
    ) {
      res.status(400).send({error: 'Missing Event Details'});
      return;
    }

    // Get the society
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
    });

    // If the society does not exist, return an error
    if (!society) {
      res.status(400).send({error: 'Invalid societyId'});
      return;
    }

    // Check that the user is a member of the society
    const isMember = await prisma.committee.findMany({
      where: {
        societyId: req.body.societyId,
        userId: decoded.id,
      },
    });

    // If the user is not a member of the society committee, return an error
    if (isMember.length === 0) {
      res.status(401).send({error: 'Unauthorized'});
      return;
    }

    // Check that the date is in the future and is valid
    if (new Date(req.body.date) < new Date()) {
      res.status(400).send({error: 'Invalid Date'});
      return;
    }

    // Get the event from the request body
    const event = await prisma.event.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        location: req.body.location,
        societyId: req.body.societyId,
      },
    });

    res.status(200).send({event: event});
  } catch (err) {
    console.log(err);
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
}

/**
 * Update an event
 * @param {Request} req The request object
 * @param {Respon} res The response object
 */
async function updateEvent(req, res) {
  try {
    // Authenticate the user
    const decoded = await auth.authenticate(req);

    // The update request must contain the eventId and at least one other field
    if (
      !req.body.eventId ||
      (!req.body.name &&
        !req.body.description &&
        !req.body.date &&
        !req.body.location)
    ) {
      res.status(400).send({error: 'Missing Event Details'});
      return;
    }

    // Get the event
    const event = await prisma.event.findUnique({
      where: {
        id: req.body.eventId,
      },
    });

    // If the event does not exist, return an error
    if (!event) {
      res.status(400).send({error: 'Invalid eventId'});
      return;
    }

    // Get the society
    const society = await prisma.society.findUnique({
      where: {
        id: event.societyId,
      },
    });

    // If the society does not exist, return an error
    if (!society) {
      res.status(400).send({error: 'Invalid societyId'});
      return;
    }

    // Check that the user is a member of the society
    const isMember = await prisma.committee.findMany({
      where: {
        societyId: event.societyId,
        userId: decoded.id,
      },
    });

    // If the user is not a member of the society committee, return an error
    if (isMember.length === 0) {
      res.status(401).send({error: 'Unauthorized'});
      return;
    }

    // If the date is in the request body, check that it is in the future and
    // is valid
    if (req.body.date && new Date(req.body.date) < new Date()) {
      res.status(400).send({error: 'Invalid Date'});
      return;
    }

    // Update the event with the details from the request body not all the
    //  fields are required to be updated so we only update the ones that are
    // present
    const updatedEvent = await prisma.event.update({
      where: {
        id: req.body.eventId,
      },
      data: {
        name: req.body.name ? req.body.name : event.name,
        description: req.body.description ?
          req.body.description :
          event.description,
        date: req.body.date ? req.body.date : event.date,
        location: req.body.location ? req.body.location : event.location,
      },
    });

    res.status(200).send({event: updatedEvent});
  } catch (err) {
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
}

/**
 * Delete an event
 * @param {Request} req The request object
 * @param {Respon} res The response object
 */
async function deleteEvent(req, res) {
  try {
    // Authenticate the user
    const decoded = await auth.authenticate(req);

    // The delete request must contain the eventId
    if (!req.body.eventId) {
      res.status(400).send({error: 'Missing Event Details'});
      return;
    }

    // Get the event
    const event = await prisma.event.findUnique({
      where: {
        id: req.body.eventId,
      },
    });

    // If the event does not exist, return an error
    if (!event) {
      res.status(400).send({error: 'Invalid eventId'});
      return;
    }

    // Check that the user is a member of the society
    const isMember = await prisma.committee.findMany({
      where: {
        societyId: event.societyId,
        userId: decoded.id,
      },
    });

    // If the user is not a member of the society committee, return an error
    if (isMember.length === 0) {
      res.status(401).send({error: 'Unauthorized'});
      return;
    }

    // Update the Event so that isArchived is true

    await prisma.event.update({
      where: {
        id: req.body.eventId,
      },
      data: {
        isArchived: true,
      },
    });

    res.status(200).send({message: 'Event Archived'});
  } catch (err) {
    console.log(err);
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
}

/**
 * Search for events
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function searchEvents(req, res) {
  try {
    const event = await prisma.event.findMany({
      where: {
        name: {
          contains: req.body.name,
          mode: 'insensitive',
        },
      },
    });
    res.status(200).send({event: event});
  } catch (err) {
    console.log(err);
    res.status(401).send({token: null, error: 'Unauthorized'});
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents,
};
