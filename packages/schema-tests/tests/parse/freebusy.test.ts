import { schemaPackageNames } from "../../src/schemas";
import { icsTestData } from "ts-ics/tests/utils";
import { VFREEBUSY_OBJECT_KEYS } from "ts-ics";

describe("Tests if all values from IcsFreeBusy are parsed from schema package", () => {
  schemaPackageNames.forEach((name) => {
    const freeBusyString = icsTestData([
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
    ]);

    it(name, async () => {
      const schemaPackage = await import(name);

      const freeBusy = schemaPackage.parseIcsFreeBusy(freeBusyString);

      VFREEBUSY_OBJECT_KEYS.forEach((freeBusyKey) => {
        if (!freeBusy[freeBusyKey])
          throw new Error(
            `The freeBusy does not contain the value "${freeBusyKey}".`
          );
      });
    });
  });
});
