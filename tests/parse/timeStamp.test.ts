import { getLine } from "@/lib/parse/utils/line";

import { parseicsTimeStamp } from "@/lib/parse/timeStamp";

it("Test Ics Timestamp Parse", async () => {
  const timestamp = `DTSTART;VALUE=DATE:19960401`;

  const { value, options } = getLine(timestamp);

  expect(() => parseicsTimeStamp(value, options)).not.toThrowError();
});

it("Test Ics Timestamp Parse", async () => {
  const timestamp = `DTSTART:19980118T073000Z`;

  const { value, options } = getLine(timestamp);

  expect(() => parseicsTimeStamp(value, options)).not.toThrowError();
});

it("Test Ics Timestamp Parse", async () => {
  const timestamp = `DTSTART;TZID=Europe/Berlin:20200910T220000Z`;

  const { value, options } = getLine(timestamp);

  expect(() => parseicsTimeStamp(value, options)).not.toThrowError();
});
