import { schemaPackageNames } from "../../src/schemas";
import { icsTestData } from "ts-ics/tests/utils";
import { VTODO_OBJECT_KEYS } from "ts-ics";

describe("Tests if all values from IcsEvent are parsed from schema package", () => {
  schemaPackageNames.forEach((name) => {
    const todoString = icsTestData([
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
    ]);

    it(name, async () => {
      const schemaPackage = await import(name);

      const todo = schemaPackage.parseIcsTodo(todoString);

      VTODO_OBJECT_KEYS.filter((k) => k !== "due").forEach((todoKey) => {
        if (!todo[todoKey])
          throw new Error(`The todo does not contain the value "${todoKey}".`);
      });
    });
  });
});
