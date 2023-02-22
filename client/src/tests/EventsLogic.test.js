/**
* @jest-environment node
*/
import { getEventById, getEvents} from '../utils/EventsLogic';

test('Get EventsById data', async() => {
  const data = await getEventById(1);
  expect(data).toHaveProperty('event');
});

test('Get Events data', async() => {
  const data = await getEvents();
  expect(data[0]).toHaveProperty('id');
});