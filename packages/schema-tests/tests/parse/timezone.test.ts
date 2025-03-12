import { schemaPackageNames } from "../../src/schemas";
import { icsTestData } from "ts-ics/tests/utils";
import { VTIMEZONE_OBJECT_KEYS, VTIMEZONE_PROP_OBJECT_KEYS } from "ts-ics";

describe("Tests if all values from IcsTimezone are parsed from schema package", () => {
  schemaPackageNames.forEach((name) => {
    const timezoneString = icsTestData([
      "BEGIN:VTIMEZONE",
      "TZID:America/New_York",
      "LAST-MODIFIED:20050809T050000Z",
      "TZURL:https://test.de",
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

    it(name, async () => {
      const schemaPackage = await import(name);

      const timezone = schemaPackage.parseIcsTimezone(timezoneString);

      VTIMEZONE_OBJECT_KEYS.forEach((timezoneKey) => {
        if (!timezone[timezoneKey])
          throw new Error(
            `The timezone does not contain the value "${timezoneKey}".`
          );
      });
    });
  });
});

describe("Tests if all values from IcsTimezoneProp are parsed from schema package", () => {
  schemaPackageNames.forEach((name) => {
    const timezonePropString = icsTestData([
      "BEGIN:DAYLIGHT",
      "DTSTART:20070311T020000",
      "TZOFFSETFROM:-0500",
      "TZOFFSETTO:-0400",
      "TZNAME:EDT",
      "RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
      "COMMENT:Some comment.",
      "RDATE:18930401T000000",
      "END:DAYLIGHT",
    ]);

    it(name, async () => {
      const schemaPackage = await import(name);

      const timezoneProp =
        schemaPackage.parseIcsTimezoneProp(timezonePropString);

      VTIMEZONE_PROP_OBJECT_KEYS.forEach((timezonePropKey) => {
        if (!timezoneProp[timezonePropKey])
          throw new Error(
            `The timezoneProp does not contain the value "${timezonePropKey}".`
          );
      });
    });
  });
});
