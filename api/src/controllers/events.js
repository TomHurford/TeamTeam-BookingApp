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
    // const events = await prisma.event.findMany();
    // I want to add the society name to each event
    const events = await prisma.event.findMany({
      where: {
        isArchived: false,
      },
    });

    // For each event get the society name and add it to the event object
    for (let i = 0; i < events.length; i++) {
      const society = await prisma.society.findUnique({
        where: {
          id: events[i].societyId,
        },
      });
      events[i].societyName = society.name;
    }
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
  // try {
  //   // Authenticate the user
  //   // const decoded = await auth.authenticate(req);

  //   // Get the event
  //   const event = await prisma.event.findUnique({
  //     where: {
  //       id: req.body.eventId,
  //     },
  //   });

  //   const ticketTypes = await prisma.ticketType.findMany({
  //     where: {
  //       event: event,
  //     },
  //   });

  //   const society = await prisma.society.findUnique({
  //     where: {
  //       id: event.societyId,
  //     },
  //   });

  //   const societyLinks = await prisma.societyLinks.findUnique({
  //     where: {
  //       societyId: event.societyId,
  //     },
  //   });

  //   res.status(200).send({
  //     event: event,
  //     ticket_types: ticketTypes,
  //     society: society,
  //     societyLinks: societyLinks,
  //   });
  // } catch (err) {
  //   res.status(401).send({token: null, error: 'Unauthorized'});
  // }

  let decoded = null;
  // Check that the request header contains a token
  if (req.headers.authorization) {
    // Authenticate the user
    try {
      decoded = await auth.authenticate(req);
    } catch (err) {
      res.status(401).send({token: null, error: 'Unauthorized'});
    }
  }

  // Check that the request body is valid i.e. has all the required fields
  // eventId
  if (!req.body.eventId) {
    res.status(400).send({error: 'Missing Event ID'});
    return;
  }

  // Get the event
  const event = await prisma.event.findUnique({
    where: {
      id: req.body.eventId,
    },
    include: {
      ticketTypes: true,
      society: {
        include: {
          links: true,
        },
      },
    },
  });

  console.log(event);

  console.log(event.society.links);

  // If the event does not exist, return an error
  if (!event) {
    res.status(400).send({error: 'Invalid eventId'});
    return;
  }

  // Check if the user is a committee member of the society
  let isMember = false;
  if (decoded) {
    isMember = await prisma.committee.findMany({
      where: {
        societyId: event.societyId,
        userId: decoded.id,
      },
    });

    if (isMember.length === 0) {
      isMember = false;
    } else {
      isMember = true;
    }
  }

  console.log(isMember);

  res.status(200).send({
    event: event,
    isCommittee: isMember,
  });
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
      !req.body.societyId||
      !req.body.ticketType
    ) {
      res.status(400).send({error: 'Missing Event Details'});
      return;
    }

    if (req.body.ticketType.length === 0) {
      res.status(400).send({error: 'Missing Ticket Type'});
      return;
    }

    if (req.body.ticketType.length > 0) {
      console.log(!req.body.ticketType[0].price);
      for (let i = 0; i < req.body.ticketType.length; i++) {
        if (
          !req.body.ticketType[i].name ||
          !req.body.ticketType[i].price ||
          !req.body.ticketType[i].quantity) {
          if (req.body.ticketType[i].price !== 0) {
            res.status(400).send({error: 'Missing Ticket Type Details'});
            return;
          }
        }
      }
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

    const ticketTypes = [];

    if (req.body.ticketType.length > 0) {
      for (let i = 0; i < req.body.ticketType.length; i++) {
        ticketTypes[i] = await prisma.ticketType.create({
          data: {
            ticketType: req.body.ticketType[i].name,
            price: req.body.ticketType[i].price,
            quantity: req.body.ticketType[i].quantity,
            eventId: event.id,
          },
        });
      }
    }

    for (let i = 0; i < ticketTypes.length; i++) {
      console.log(ticketTypes[i]);
    }

    res.status(200).send({event: event, ticket_types: ticketTypes});
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
  let decoded = null;
  try {
    decoded = await auth.authenticate(req);
  } catch (err) {
    res.status(401).send({token: null, error: 'Unauthorized'});
  }

  // The update request must contain the eventId, societyId and at least one
  // other field
  if (
    !req.body.eventId ||
    !req.body.societyId ||
    (!req.body.name &&
      !req.body.description &&
      !req.body.date &&
      !req.body.location &&
      !req.body.banner)
  ) {
    res.status(400).send({error: 'Missing Event Details'});
    return;
  }

  // Check that the event exists
  const event = await prisma.event.findUnique({
    where: {
      id: req.body.eventId,
    },
  });

  // Check that the society exists
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

  // Check that the user is a committee member of the society
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
      banner: req.body.banner ? req.body.banner : event.banner,
    },
  });

  res.status(200).send({event: updatedEvent});
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

async function checkPrivileges(req, res) {
  try {
    // Authenticate the user
    const decoded = await auth.authenticate(req);

    // Check that the user is a member of the society
    const isMember = await prisma.committee.findMany({
      where: {
        userId: decoded.id,
      },
    });

    // If the user is not a member of the society committee, return an error
    if (isMember.length === 0) {
      res.status(401).send({ error: "Unauthorized" });
      return;
    }

    res.status(200).send({ message: "Authorized" });
  } catch (err) {
    console.log(err);
    res.status(401).send({ token: null, error: "Unauthorized" });
  }
}

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents,
  checkPrivileges,
};
