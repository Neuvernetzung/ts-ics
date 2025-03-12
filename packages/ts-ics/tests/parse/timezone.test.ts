import { convertIcsEvent } from "@/lib";
import { convertIcsTimezone } from "@/lib/parse/timezone";
import { icsTestData } from "../utils";

it("Test Ics Timezone Parse", async () => {
  const timezone = icsTestData([
    "BEGIN:VTIMEZONE",
    "TZID:America/New_York",
    "LAST-MODIFIED:20050809T050000Z",
    "BEGIN:DAYLIGHT",
    "DTSTART:19670430T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=-1SU;UNTIL=19730429T070000Z",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "DTSTART:19671029T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU;UNTIL=20061029T060000Z",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:19740106T020000",
    "RDATE:19750223T020000",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "BEGIN:DAYLIGHT",
    "DTSTART:19760425T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=-1SU;UNTIL=19860427T070000Z",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "BEGIN:DAYLIGHT",
    "DTSTART:19870405T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU;UNTIL=20060402T070000Z",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "BEGIN:DAYLIGHT",
    "DTSTART:20070311T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "BEGIN:STANDARD",
    "DTSTART:20071104T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "END:STANDARD",
    "END:VTIMEZONE",
  ]);

  expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
  const timezone = icsTestData([
    "BEGIN:VTIMEZONE",
    "TZID:America/New_York",
    "LAST-MODIFIED:20050809T050000Z",
    "BEGIN:STANDARD",
    "DTSTART:20071104T020000",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:20070311T020000",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
  ]);
  expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
  const timezone = icsTestData([
    "BEGIN:VTIMEZONE",
    "TZID:America/New_York",
    "LAST-MODIFIED:20050809T050000Z",
    "TZURL:http://zones.example.com/tz/America-New_York.ics",
    "BEGIN:STANDARD",
    "DTSTART:20071104T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:20070311T020000",
    "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
  ]);
  expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
  const timezone = icsTestData([
    "BEGIN:VTIMEZONE",
    "TZID:Fictitious",
    "LAST-MODIFIED:19870101T000000Z",
    "BEGIN:STANDARD",
    "DTSTART:19671029T020000",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:19870405T020000",
    "RRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=4;UNTIL=19980404T070000Z",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
  ]);
  expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
  const timezone = icsTestData([
    "BEGIN:VTIMEZONE",
    "TZID:Fictitious",
    "LAST-MODIFIED:19870101T000000Z",
    "BEGIN:STANDARD",
    "DTSTART:19671029T020000",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
    "TZOFFSETFROM:-0400",
    "TZOFFSETTO:-0500",
    "TZNAME:EST",
    "END:STANDARD",
    "BEGIN:DAYLIGHT",
    "DTSTART:19870405T020000",
    "RRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=4;UNTIL=19980404T070000Z",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "BEGIN:DAYLIGHT",
    "DTSTART:19990424T020000",
    "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=4",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
    "END:VTIMEZONE",
  ]);
  expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics custom not provided Timezone", async () => {
  // https://github.com/Neuvernetzung/ts-ics/issues/104
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:20241210T100000-541111@example.com",
    "DTSTAMP:20241210T100000",
    "DTSTART;TZID=Customized Time Zone:20241210T100000",
    "DTEND;TZID=Customized Time Zone:20241210T110000",
    "SUMMARY:Festival International de Jazz de Montreal",
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
  ]);
  expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});
