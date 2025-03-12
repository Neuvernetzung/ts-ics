import { schemaPackageNames } from "../../src/schemas";
import { icsTestData } from "ts-ics/tests/utils";
import { VCALENDAR_OBJECT_KEYS } from "ts-ics";

describe("Tests if all values from IcsCalendar are parsed from schema package", () => {
  schemaPackageNames.forEach((name) => {
    const calendarString = icsTestData([
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "X-WR-CALNAME:My favorite calendar",
      "PRODID:http://www.example.com/calendarapplication/",
      "METHOD:PUBLISH",
      "BEGIN:VTIMEZONE",
      "TZID:Europe/Berlin",
      "BEGIN:STANDARD",
      "DTSTART:16011028T030000",
      "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
      "TZOFFSETFROM:+0200",
      "TZOFFSETTO:+0100",
      "END:STANDARD",
      "BEGIN:DAYLIGHT",
      "DTSTART:16010325T020000",
      "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
      "TZOFFSETFROM:+0100",
      "TZOFFSETTO:+0200",
      "END:DAYLIGHT",
      "END:VTIMEZONE",
      "BEGIN:VEVENT",
      "UID:461092315540@example.com",
      `ORGANIZER;CN="Alice Balder, Example Inc.":MAILTO:alice@example.com`,
      "LOCATION:Irgendwo",
      "GEO:48.85299;2.36885",
      "SUMMARY:Eine Kurzinfo",
      `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`,
      `ATTENDEE;DELEGATED-FROM="mailto:immud@example.com":mailto:ildoit@example.co`,
      " m",
      "DESCRIPTION:Beschreibung des Termins",
      "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3",
      "CLASS:PUBLIC",
      "DTSTART;TZID=Europe/Berlin:20200910T220000Z",
      "DTEND;TZID=Europe/Berlin:20200919T215900Z",
      "DTSTAMP:20200812T125900Z",
      "BEGIN:VALARM",
      "ACTION:DISPLAY",
      "TRIGGER:-PT2H",
      "DESCRIPTION:Mozilla Standardbeschreibung",
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR",
    ]);

    it(name, async () => {
      const schemaPackage = await import(name);

      const calendar = schemaPackage.parseIcsCalendar(calendarString);

      VCALENDAR_OBJECT_KEYS.forEach((calendarKey) => {
        if (!calendar[calendarKey])
          throw new Error(
            `The calendar does not contain the value "${calendarKey}".`
          );
      });
    });
  });
});
