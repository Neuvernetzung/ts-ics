import { compareDesc } from "date-fns";

import { generateIcsTimeStamp, convertIcsTimeStamp } from "@/lib";
import { getLine } from "@/lib/parse/utils/line";
import { IcsDateObject } from "@/types";

import { fictiveTimezone } from "./fixtures/timezones";
import { CRLF_BREAK } from "@/constants";

it("Test Ics Timestamp Generate - UTC", async () => {
  const date = new Date("2025-04-10T08:30:00Z");

  const dateObject: IcsDateObject = { date, type: "DATE-TIME" };

  const dateTimeString = generateIcsTimeStamp("DTSTART", dateObject);

  const { line } = getLine(dateTimeString);

  const parsed = convertIcsTimeStamp(undefined, line);

  expect(parsed.date).toEqual(dateObject.date);
});

it("Test Ics Timestamp Generate - IcsTimezone", async () => {
  const date = new Date("2025-04-10T08:30:00Z");

  const offset = fictiveTimezone.props.sort((a, b) =>
    compareDesc(a.start, b.start)
  )[0]?.offsetTo;

  const dateObject: IcsDateObject = {
    date,
    type: "DATE-TIME",
    local: {
      date,
      timezone: fictiveTimezone.id,
      tzoffset: offset,
    },
  };

  const dateTimeString = generateIcsTimeStamp(
    "DTSTART",
    dateObject,
    undefined,
    { timezones: [fictiveTimezone] }
  );

  const { line } = getLine(dateTimeString);

  const parsed = convertIcsTimeStamp(undefined, line, {
    timezones: [fictiveTimezone],
  });

  expect(parsed.date).toEqual(dateObject.date);
});

it("Test Ics Timestamp Generate - IANA Timezone", async () => {
  const date = new Date("2025-04-10T08:30:00Z");

  const dateObject: IcsDateObject = {
    date,
    type: "DATE-TIME",
    local: {
      date,
      timezone: "America/New_York",
      tzoffset: "-0400",
    },
  };

  const dateTimeString = generateIcsTimeStamp("DTSTART", dateObject);

  const { line } = getLine(dateTimeString);

  const parsed = convertIcsTimeStamp(undefined, line);

  expect(parsed.date).toEqual(dateObject.date);
});

it("Test Ics Timestamp Generate - Z is stripped correctly when local date is provided - gh#165", async () => {
  const date = new Date("2025-04-14T08:30+0200");

  const dateObject: IcsDateObject = {
    date,
    type: "DATE-TIME",
    local: {
      date,
      timezone: "Europe/Berlin",
      tzoffset: "+0200",
    },
  };

  const dateTimeString = generateIcsTimeStamp("DTSTART", dateObject);

  expect(dateTimeString.replace(CRLF_BREAK, "")).toEqual(
    "DTSTART;VALUE=DATE-TIME;TZID=Europe/Berlin:20250414T083000"
  );
});
