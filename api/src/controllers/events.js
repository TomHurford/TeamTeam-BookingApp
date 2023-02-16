//EVENTS CONTROLLER
const prisma = require('../../prisma/prisma.js')

// TODO: What if we have hundreds of events? We need to paginate the results
async function dateRange(start_date, end_date){
    // If either start date is null, return all events before the end date
    // If either end date is null, return all events after the start date
    // If both dates are null, return all events
    // If both dates are not null, return all events between the two dates
    if (start_date === null && end_date === null) {
        return await prisma.event.findMany()
    }
    if (start_date === null) {
        return await prisma.event.findMany({
            where: {
                date: {
                    lte: end_date
                }
            }
        })
    }
    if (end_date === null) {
        return await prisma.event.findMany({
            where: {
                date: {
                    gte: start_date
                }
            }
        })
    }
    return await prisma.event.findMany({
        where: {
            date: {
                gte: start_date,
                lte: end_date
            }
        }
    })
}



async function getEvents(req, res) {
    // try {
    //     // Authenticate the user
    //     const decoded = await authenticate(req)

    //     // Get all events
    //     const events = await prisma.event.findMany({
    //         where: {
    //             user_id: decoded.id
    //         }
    //     })

    //     res.status(200).send(events)
    // } catch (err) {
    //     res.status(401).send({token: null, error: 'Unauthorized'})
    // }
    const events = await prisma.event.findMany()
    res.status(200).send(events)
}

async function getEventById(req, res) {
    try {
        // Authenticate the user
        // const decoded = await authenticate(req)

        // Get the event
        const event = await prisma.event.findUnique({
            where: {
                id: req.body.eventId
            }
        })

        const ticket_types = await prisma.ticketType.findMany({
            where: {
                event : event
            }
        })

        const society = await prisma.society.findUnique({
            where: {
                id: event.societyId 
            }
        })

        res.status(200).send({event: event, ticket_types: ticket_types, society: society})
    } catch (err) {
        res.status(401).send({token: null, error: 'Unauthorized'})
    }
}

async function getEventsBySociety(req, res) {
    try {
        // Authenticate the user
        const decoded = await authenticate(req)

        // Get all events
        const events = await prisma.event.findMany({
            where: {
                society_id: req.params.id
            }
        })
        // 

        res.status(200).send(events)
    } catch (err) {
        res.status(401).send({token: null, error: 'Unauthorized'})
    }
}

async function getEventsByDate(req, res) {
    try {
        // Authenticate the user
        const decoded = await authenticate(req)

        const events = await dateRange(req.params.start_date, req.params.end_date)

        res.status(200).send(events)
    } catch (err) {
        res.status(401).send({token: null, error: 'Unauthorized'})
    }
}

async function getEventsByDateAndSociety(req, res) {
    try {
        // Authenticate the user
        const decoded = await authenticate(req)

        const events = await dateRange(req.params.start_date, req.params.end_date)

        // Filter the events by society
        const filteredEvents = events.filter(event => event.society_id === req.params.society_id)

        res.status(200).send(events)
    } catch (err) {
        res.status(401).send({token: null, error: 'Unauthorized'})
    }
}

async function createEvent(req, res) {
    try {
        // Authenticate the user
        const decoded = await authenticate(req)

        // Check that the request body is valid i.e. has all the required fields name, description, date, location, society_id
        if (!req.body.name || !req.body.description || !req.body.date || !req.body.location || !req.body.society_id) {
            res.status(400).send({error: 'Missing Event Details'})
            return
        }

        // Get the society
        const society = await prisma.society.findUnique({
            where: {
                id: req.body.society_id
            }
        })

        // If the society does not exist, return an error
        if (!society) {
            res.status(400).send({error: 'invalid society_id'})
            return
        }

        // Check that the user is a member of the society committee
        if (!society.committee.includes(decoded.id)) {
            res.status(401).send({error: 'Unauthorized'})
            return
        }

        // Check that the date is in the future and is valid
        if (new Date(req.body.date) < new Date()) {
            res.status(400).send({error: 'Invalid Date'})
            return
        }


        res.status(200).send(event)
    } catch (err) {
        res.status(401).send({token: null, error: 'Unauthorized'})
    }
}


module.exports = {
    getEvents,
    getEventById,
    getEventsBySociety,
    getEventsByDate,
    getEventsByDateAndSociety,
    createEvent
}