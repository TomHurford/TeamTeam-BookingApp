
import { paginate } from "../utils/paginate";

test("Returns empty array if no items are passed", () => {
  expect(paginate([], 1, 10)).toEqual([]);
});
