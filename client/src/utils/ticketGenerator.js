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

    if (event.event.id != ticketTypes[0].eventId) {
        return 0;
    }

    var token = jwt.getToken();

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }      

    var types = [];
    ticketTypes.map((ticketType) => {
        
        types.push({
            "id": ticketType.id,
            "quantity": tickets[ticketType.id]
        });

    });

    const res = await axios.post('http://localhost:5001/purchase/create', {
            status: "paid",
            method: "air",
            total: total,
            ticket_quantities: {
                types: types
            },
            eventId: event.event.id
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
