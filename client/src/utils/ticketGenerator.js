const axios = require('axios');
const jwt = require("./jwt.js");

const generateTickets = async (event, ticketTypes, tickets, total) => {

    // Check Logged In
    var isLoggedIn = false;

    await jwt.checkIsLoggedIn().then((res) => {if (res) {isLoggedIn = res;}});

    if (!isLoggedIn) {
        return 0;
    }

    // Create tickets for each.

    if (event.id != ticketTypes[0].eventId) {
        return 0;
    }

    var token = jwt.getToken();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }      

    var types = [];
    let ticketsObj = tickets();
    ticketTypes.map((ticketType) => {
        if(ticketsObj[ticketType.id] !== undefined) {
            types.push({
                "id": ticketType.id,
                "quantity": ticketsObj[ticketType.id]
            });
        }


    });

    console.log({
        status: "paid",
        method: "air",
        total: total,
        ticket_quantities: {
            types: types
        },
        eventId: event.id
    });

    const res = await axios.post(process.env.REACT_APP_API_URL + '/purchase/create', {
            status: "paid",
            method: "air",
            total: total,
            ticket_quantities: {
                types: types
            },
            eventId: event.id
        },{
            headers: headers
        }).catch(err => {
            console.log(err);
        })

    console.log(res);

    if (res.status === 200) return 1;

    return 0;
}

module.exports = {
    generateTickets
};
