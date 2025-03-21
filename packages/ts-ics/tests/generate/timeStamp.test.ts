import { addMilliseconds, compareDesc } from "date-fns";

import { generateIcsTimeStamp, convertIcsTimeStamp } from "@/lib";
import { getLine } from "@/lib/parse/utils/line";
import { IcsDateObject } from "@/types";

import { fictiveTimezone } from "./fixtures/timezones";
import { timeZoneOffsetToMilliseconds } from "@/utils";
import { getOffsetFromTimezoneId } from "@/utils/timezone/getOffsetFromTimezoneId";

it("Test Ics Timestamp Generate - UTC", async () => {
  const date = new Date(2023, 6, 12, 14, 30);

  const dateObject: IcsDateObject = { date, type: "DATE-TIME" };

  const dateTimeString = generateIcsTimeStamp("DTSTART", dateObject);

  const { line } = getLine(dateTimeString);

  const parsed = convertIcsTimeStamp(undefined, line);

  expect(parsed.date).toEqual(dateObject.date);
});

it("Test Ics Timestamp Generate - IcsTimezone", async () => {
  const date = new Date(2023, 6, 2, 14, 30);

  const offset = fictiveTimezone.props.sort((a, b) =>
    compareDesc(a.start, b.start)
  )[0]?.offsetTo;

  const dateObject: IcsDateObject = {
    date,
    type: "DATE-TIME",
    local: {
      date: addMilliseconds(date, timeZoneOffsetToMilliseconds(offset)),
      timezone: fictiveTimezone.id,
      tzoffset: offset,
    },
  };

  const dateTimeString = generateIcsTimeStamp("DTSTART", dateObject);

  const { line } = getLine(dateTimeString);

  const parsed = convertIcsTimeStamp(undefined, line, {
    timezones: [fictiveTimezone],
  });

  expect(parsed.date).toEqual(dateObject.date);
});

it("Test Ics Timestamp Generate - IANA Timezone", async () => {
  const date = new Date(2023, 6, 2, 14, 30);

  const dateObject: IcsDateObject = {
    date,
    type: "DATE-TIME",
    local: {
      date: addMilliseconds(
        date,
        getOffsetFromTimezoneId("America/New_York", date)
      ),
      timezone: "America/New_York",
      tzoffset: "-0400",
    },
  };

  const dateTimeString = generateIcsTimeStamp("DTSTART", dateObject);

  const { line } = getLine(dateTimeString);

  const parsed = convertIcsTimeStamp(undefined, line);

  expect(parsed.date).toEqual(dateObject.date);
});
