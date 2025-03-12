import { schemaPackageNames } from "../../src/schemas";
import { icsTestData } from "ts-ics/tests/utils";
import { VEVENT_OBJECT_KEYS } from "ts-ics";

describe("Tests if all values from IcsEvent are parsed from schema package", () => {
  schemaPackageNames.forEach((name) => {
    const eventString = icsTestData([
      "BEGIN:VEVENT",
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
      "TRANSP:TRANSPARENT",
      "LOCATION:Unknown place",
      "GEO:48.85299;2.36885",
      `ORGANIZER;CN="Alice Balder, Example Inc.":MAILTO:alice@example.com`,
      "PRIORITY:5",
      "SEQUENCE:1",
      "STATUS:CONFIRMED",
      "ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud",
      `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`,
      "RECURRENCE-ID;VALUE=DATE:19960401",
      "CLASS:CONFIDENTIAL",
      "CATEGORIES:ANNIVERSARY,PERSONAL,SPECIAL OCCASION",
      "RRULE:FREQ=YEARLY",
      "BEGIN:VALARM",
      "TRIGGER;VALUE=DATE-TIME:19970317T133000Z",
      "REPEAT:4",
      "DURATION:PT15M",
      "ACTION:AUDIO",
      "ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud",
      "END:VALARM",
      "END:VEVENT",
    ]);

    it(name, async () => {
      const schemaPackage = await import(name);

      const event = schemaPackage.parseIcsEvent(eventString);

      VEVENT_OBJECT_KEYS.filter((k) => k !== "end").forEach((eventKey) => {
        if (!event[eventKey])
          throw new Error(
            `The event does not contain the value "${eventKey}".`
          );
      });
    });
  });
});
