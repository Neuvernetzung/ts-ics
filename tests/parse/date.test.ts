import { parseIcsDate, parseIcsDateTime } from "../..";

it("Test Ics Date Time Parse", async () => {
  const dateTime = `19980118T073000Z`;

  expect(() => parseIcsDateTime(dateTime)).not.toThrowError();
});

it("Test Ics Date Parse", async () => {
  const date = `19980118`;

  expect(() => parseIcsDate(date)).not.toThrowError();
});
