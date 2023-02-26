import reportWebVitals from "../reportWebVitals";

test("reportWebVitals is a function", () => {
  expect(typeof reportWebVitals).toBe("function");
});

test("reportWebVitals returns undefined", () => {
  expect(reportWebVitals()).toBe(undefined);
});
