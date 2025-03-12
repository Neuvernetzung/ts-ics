import { schemaPackageNames } from "../../src/schemas";
import { icsTestData } from "ts-ics/tests/utils";
import { VALARM_OBJECT_KEYS } from "ts-ics";

describe("Tests if all values from IcsAlarm are parsed from schema package", () => {
  schemaPackageNames.forEach((name) => {
    const alarmString = icsTestData([
      "BEGIN:VALARM",
      "SUMMARY:Some alarm.",
      "DESCRIPTION:This is some test alarm.",
      "TRIGGER;VALUE=DATE-TIME:19970317T133000Z",
      "REPEAT:4",
      "DURATION:PT15M",
      "ACTION:AUDIO",
      "ATTACH;FMTTYPE=audio/basic:ftp://example.com/pub/sounds/bell-01.aud",
      `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`,
      "END:VALARM",
    ]);

    it(name, async () => {
      const schemaPackage = await import(name);

      const alarm = schemaPackage.parseIcsAlarm(alarmString);

      VALARM_OBJECT_KEYS.forEach((alarmKey) => {
        if (!alarm[alarmKey])
          throw new Error(
            `The alarm does not contain the value "${alarmKey}".`
          );
      });
    });
  });
});
