/**
* @jest-environment node
*/
import { getEventById, getEvents} from '../utils/EventsLogic';

describe('Get EventsById data', () => {

  test('JSON data includes event data', async() => {
    const data = await getEventById(1);
    expect(data).toHaveProperty('event');
  });

  test('JSON data includes ticket type data', async() => {
    const data = await getEventById(1);
    expect(data).toHaveProperty('ticket_types');
  });

  test('JSON data includes society data', async() => {
    const data = await getEventById(1);
    expect(data).toHaveProperty('society');
  });

  test('JSON data includes society links data', async() => {
    const data = await getEventById(1);
    expect(data).toHaveProperty('societyLinks');
  });

  describe('Event data', () => {
    test('Event has id field', async () => {
      const data = await getEventById(1);
      expect(data.event).toHaveProperty('id');
    });

    test('Event has name field', async () => {
      const data = await getEvents();
      const event = data[0];
      expect(event).toHaveProperty('name');
    });

    test('Event has description field', async () => {
      const data = await getEvents();
      const event = data[0];
      expect(event).toHaveProperty('description');
    });

    test('Event has date field', async () => {
      const data = await getEvents();
      const event = data[0];
      expect(event).toHaveProperty('date');
    });

    test('Event has location field', async () => {
      const data = await getEvents();
      const event = data[0];
      expect(event).toHaveProperty('location');
    });

    test('Event has banner field', async () => {
      const data = await getEvents();
      const event = data[0];
      expect(event).toHaveProperty('banner');
    });

    test('Event has societyId field', async () => {
      const data = await getEvents();
      const event = data[0];
      expect(event).toHaveProperty('societyId');
    });

    test('Event has isArchived field', async () => {
      const data = await getEvents();
      const event = data[0];
      expect(event).toHaveProperty('isArchived');
    });
  });

  describe('Ticket type data', () => {
    test('Ticket type has id field', async () => {
      const data = await getEventById(1);
      const ticketType = data.ticket_types[0];
      expect(ticketType).toHaveProperty('id');
    });

    test('Ticket type has ticketType field', async () => {
      const data = await getEventById(1);
      const ticketType = data.ticket_types[0];
      expect(ticketType).toHaveProperty('ticketType');
    });

    test('Ticket type has price field', async () => {
      const data = await getEventById(1);
      const ticketType = data.ticket_types[0];
      expect(ticketType).toHaveProperty('price');
    });

    test('Ticket type has quantity field', async () => {
      const data = await getEventById(1);
      const ticketType = data.ticket_types[0];
      expect(ticketType).toHaveProperty('quantity');
    });

    test('Ticket type has eventId field', async () => {
      const data = await getEventById(1);
      const ticketType = data.ticket_types[0];
      expect(ticketType).toHaveProperty('eventId');
    });

    test('Ticket type has isArchived field', async () => {
      const data = await getEventById(1);
      const ticketType = data.ticket_types[0];
      expect(ticketType).toHaveProperty('isArchived');
    });
  });

  describe('Society data', () => {
    test('Society has id field', async () => {
      const data = await getEventById(1);
      expect(data.society).toHaveProperty('id');
    });

    test('Society has name field', async () => {
      const data = await getEventById(1);
      expect(data.society).toHaveProperty('name');
    });

    test('Society has email field', async () => {
      const data = await getEventById(1);
      expect(data.society).toHaveProperty('email');
    });

    test('Society has description field', async () => {
      const data = await getEventById(1);
      expect(data.society).toHaveProperty('description');
    });
  });

  describe('Society links data', () => {
    test('Society link has id field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('id');
    });

    test('Society link has instagram field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('instagram');
    });

    test('Society link has facebook field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('facebook');
    });

    test('Society link has twitter field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('twitter');
    });

    test('Society link has website field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('website');
    });

    test('Society link has logo field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('logo');
    });

    test('Society link has banner field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('banner');
    });

    test('Society link has societyId field', async () => {
      const data = await getEventById(1);
      expect(data.societyLinks).toHaveProperty('societyId');
    });
  });
});

describe('Get Events data', () => {
  
  test('Event has id field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('id');
  });

  test('Event has name field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('name');
  });

  test('Event has description field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('description');
  });

  test('Event has date field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('date');
  });

  test('Event has location field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('location');
  });

  test('Event has banner field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('banner');
  });

  test('Event has societyId field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('societyId');
  });

  test('Event has isArchived field', async () => {
    const data = await getEvents();
    const event = data[0];
    expect(event).toHaveProperty('isArchived');
  });

});