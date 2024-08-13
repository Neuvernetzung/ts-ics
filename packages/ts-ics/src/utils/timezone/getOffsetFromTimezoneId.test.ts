import { getOffsetFromTimezoneId } from "./getOffsetFromTimezoneId";

it("Test getOffsetFromTimezoneId", async () => {
  const date = new Date(2023, 6, 2, 14, 30);

  const offset = getOffsetFromTimezoneId("America/New_York", date);

  expect(offset).toBe(-14400000);
});

it("Test getOffsetFromTimezoneId - dont throw when custom not provided timezone", async () => {
  // https://github.com/Neuvernetzung/ts-ics/issues/104
  const date = new Date(2023, 6, 2, 14, 30);

  expect(() =>
    getOffsetFromTimezoneId("Customized unknown Time Zone", date)
  ).not.toThrow();
});
