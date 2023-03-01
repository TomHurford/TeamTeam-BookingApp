// EVENTS CONTROLLER
const prisma = require("../../prisma/prisma.js");
const auth = require("../utils/jwt_auth.js");

async function getTickets(req, res) {

    // (user token)

    let decoded = null;

    try {
        decoded = await auth.authenticate(req);
    } catch (err) {
        return res.status(401).send({message:'Unauthorised'});
    }

    const userId = decoded.id;

    // Check if user exists
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    });

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const tickets = await prisma.ticket.findMany({
        where: {
            userId: userId
        }
    });
    
    res.status(200).send(tickets);
}

/**
 * Create tickets function for a user, the request should contain a JSON object with the following properties:
 * { "ticketTypeId": [ticket_type_id] }
 * { "quantity": [quantity] }
 * 
 * And the user token in the header
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @return response
 */
async function createTickets(req, res) {

    // (user token, ticket type ID, quantity)
    let decoded = null;
    try {
        decoded = await auth.authenticate(req);
    } catch (err) {
        return res.status(401).send({message: 'Unauthorised'});
    }
    
    if (req.body === undefined || req.body.ticketTypeId === undefined || req.body.quantity === undefined) {
        return res.status(400).send({message: 'Missing Body'});
    }
    if (req.body.quantity < 1) return res.status(400).send({message: 'Invalid Quantity'});

    ticketType = await prisma.ticketType.findFirst({
        where: {
            id: req.body.ticketTypeID
        }
    })
    
    if (!ticketType) return res.status(400).send({message: 'Invalid Ticket Type'});

    for (let i = 0; i < req.body.quantity; i++) {
        prisma.create()        
    }

    res.status(200).send();
}

async function updateTicket(req, res) {
    // (user token, ticket ID, status)
    let decoded = null;
    try {
        decoded = await auth.authenticate(req);
    } catch (err) {
        return res.status(401).send({message: 'Unauthorised'});
    }

    res.status(200).send();
}

module.exports = {
    getTickets,
    createTickets,
    updateTicket
};