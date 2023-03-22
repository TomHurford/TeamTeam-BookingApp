
import { paginate } from "../utils/paginate";
//Unit test for paginate.js
test("Returns empty array if no items are passed", () => {
  expect(paginate([], 1, 10)).toEqual([]);
});
