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
      "BEGIN:VFREEBUSY",
      "UID:19970901T095957Z-76A912@example.com",
      "ORGANIZER:mailto:jane_doe@example.com",
      "ATTENDEE:mailto:john_public@example.com",
      "DTSTAMP:19970901T100000Z",
      "DTSTART:19970901T100000Z",
      "DTEND:19980901T100000Z",
      "FREEBUSY:19971015T050000Z/PT8H30M,",
      " 19971015T160000Z/PT5H30M,19971015T223000Z/PT6H30M",
      "URL:http://example.com/pub/busy/jpublic-01.ifb",
      "COMMENT:This iCalendar file contains busy time information for",
      "  the next three months.",
      "END:VFREEBUSY",
      "BEGIN:VJOURNAL",
      "UID:19970901T130000Z-123403@example.com",
      "DTSTAMP:19970901T130000Z",
      "DTSTART;VALUE=DATE:19971102",
      "CREATED;VALUE=DATE:19971102",
      "LAST-MODIFIED;VALUE=DATE:19971102",
      "URL:https://test.de",
      "EXDATE:20070402T010000Z",
      "SUMMARY:Our Blissful Anniversary",
      "DESCRIPTION:Some description.",
      "COMMENT:Some comment.",
      "LOCATION:Unknown place",
      "GEO:48.85299;2.36885",
      `ORGANIZER;CN="Alice Balder, Example Inc.":MAILTO:alice@example.com`,
      "PRIORITY:5",
      "SEQUENCE:1",
      "STATUS:DRAFT",
      "ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud",
      `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`,
      "RECURRENCE-ID;VALUE=DATE:19960401",
      "CLASS:CONFIDENTIAL",
      "CATEGORIES:ANNIVERSARY,PERSONAL,SPECIAL OCCASION",
      "RRULE:FREQ=YEARLY",
      "END:VJOURNAL",
      "BEGIN:VTODO",
      "UID:19970901T130000Z-123403@example.com",
      "DTSTAMP:19970901T130000Z",
      "DTSTART;VALUE=DATE:19971102",
      "CREATED;VALUE=DATE:19971102",
      "LAST-MODIFIED;VALUE=DATE:19971102",
      "URL:https://test.de",
      "EXDATE:20070402T010000Z",
      "DURATION:P1D",
      "SUMMARY:Our Blissful Anniversary",
      "DESCRIPTION:Some description.",
      "COMMENT:Some comment.",
      "LOCATION:Unknown place",
      "COMPLETED:19970901T130000Z",
      "PERCENT-COMPLETE:80",
      "GEO:48.85299;2.36885",
      `ORGANIZER;CN="Alice Balder, Example Inc.":MAILTO:alice@example.com`,
      "PRIORITY:5",
      "SEQUENCE:1",
      "STATUS:NEEDS-ACTION",
      "ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud",
      `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`,
      "RECURRENCE-ID;VALUE=DATE:19960401",
      "CLASS:CONFIDENTIAL",
      "CATEGORIES:ANNIVERSARY,PERSONAL,SPECIAL OCCASION",
      "RRULE:FREQ=YEARLY",
      "END:VTODO",
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

      if (!calendar.timezones)
        throw new Error("The calendar does not contain timezones.");
      if (!calendar.events)
        throw new Error("The calendar does not contain events.");
      if (!calendar.todos)
        throw new Error("The calendar does not contain todos.");
      if (!calendar.journals)
        throw new Error("The calendar does not contain journals.");
      if (!calendar.freeBusy)
        throw new Error("The calendar does not contain freeBusy.");
    });
  });
});
