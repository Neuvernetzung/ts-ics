import { convertIcsEvent } from "@/lib";
import { convertIcsExceptionDates } from "@/lib/parse/values/exceptionDate";
import { icsTestData } from "../utils";

it("Test Ics Event Parse - Exception Date-Times, comma separated", async () => {
  const value = "20070402T010000Z,20070403T010000Z,20070404T010000Z";

  const parsed = convertIcsExceptionDates(undefined, { value });

  expect(parsed?.length).toBe(3);
});

it("Test Ics Event Parse - multiple Exception Date-Times", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:20070423T123432Z-541111@example.com",
    "DTSTAMP:20070423T123432Z",
    "DTSTART;VALUE=DATE:20070628",
    "DTEND;VALUE=DATE:20070709",
    "EXDATE:20070402T010000Z",
    "EXDATE:20070403T010000Z",
    "EXDATE:20070404T010000Z",
    "SUMMARY:Festival International de Jazz de Montreal",
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
  ]);
  const parsed = convertIcsEvent(undefined, event);

  expect(parsed.exceptionDates?.length).toBe(3);
});
