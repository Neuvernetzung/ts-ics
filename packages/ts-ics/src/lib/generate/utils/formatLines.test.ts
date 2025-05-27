import { formatLines } from "./formatLines";
import { icsTestData } from "../../../../tests/utils";
import { convertIcsCalendar } from "@/lib/parse";
import { generateIcsCalendar } from "../calendar";

it("Correcly break lines longer than the max line length", async () => {
  const unformatted = `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US???(cn=John%20Smith)":mailto:jsmith@example.com`;

  const formatted = icsTestData([
    `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US?`,
    ` ??(cn=John%20Smith)":mailto:jsmith@example.com`,
  ]);

  expect(formatLines(unformatted)).toEqual(formatted);
});

it("Correctly handle LF line breaks", async () => {
  const unformatted =
    "DESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User";

  const formatted = icsTestData([
    "DESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to disc",
    " uss the information regarding the administration of travel documents for th",
    " e trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
  ]);

  expect(formatLines(unformatted)).toEqual(formatted);
});

it("Correctly handles escaped newlines in description - gh#183", async () => {
  const unformatted = "DESCRIPTION:Test\n\\nb";

  const formatted = icsTestData(["DESCRIPTION:Test\n\\nb"]);

  expect(formatLines(unformatted)).toStrictEqual(formatted);
});

it("Test gh#183 with escaped newlines in description", async () => {
  const calendar = icsTestData([
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Mozilla.org/NONSGML Mozilla Calendar V1.1//EN",
    "BEGIN:VEVENT",
    "UID:ebfb1205-a3c1-4715-acf0-9dd7028eaa69",
    "DTSTART:20250522T173000Z",
    "DTEND:20250523T150000Z",
    "CREATED:20250520T114851Z",
    `DESCRIPTION;ALTREP="data:text/html,Test%3Cbr%3E%5Cn%3Cbr%3Eb":Test\n\\n\nb`,
    "DTSTAMP:20250526T123957Z",
    "LAST-MODIFIED:20250526T123957Z",
    "LOCATION:Some\\nPlace",
    "SEQUENCE:6",
    "SUMMARY:Test\\nEvent",
    "TRANSP:OPAQUE",
    "X-MOZ-GENERATION:14",
    "END:VEVENT",
    "END:VCALENDAR",
  ]);

  const icsCalendar = convertIcsCalendar(undefined, calendar);

  const description = icsCalendar.events?.[0].description;
  const summary = icsCalendar.events?.[0].summary;
  const location = icsCalendar.events?.[0].location;

  expect(description).toBe("Test\n\\n\nb");
  expect(summary).toBe("Test\\nEvent");
  expect(location).toBe("Some\\nPlace");

  const newCalendar = generateIcsCalendar(icsCalendar);

  expect(newCalendar).toContain(description);
  expect(newCalendar).toContain(summary);
  expect(newCalendar).toContain(location);
});
