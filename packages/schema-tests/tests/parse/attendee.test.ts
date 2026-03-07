import { schemaPackageNames } from "../../src/schemas";
import { icsTestData } from "ts-ics/tests/utils";

describe("Tests if attendee CUTYPE is preserved through schema parsing", () => {
  schemaPackageNames.forEach((name) => {
    const eventString = icsTestData([
      "BEGIN:VEVENT",
      "UID:19970901T130000Z-123403@example.com",
      "DTSTAMP:19970901T130000Z",
      "DTSTART;VALUE=DATE:19971102",
      "SUMMARY:Meeting",
      "DURATION:P1D",
      "ATTENDEE;CUTYPE=ROOM;CN=Room A:MAILTO:room-a@example.com",
      "END:VEVENT",
    ]);

    it(name, async () => {
      const schemaPackage = await import(name);

      const event = schemaPackage.parseIcsEvent(eventString);
      const attendee = event.attendees[0];

      expect(attendee.cutype).toEqual("ROOM");
      expect(attendee.name).toEqual("Room A");
      expect(attendee.email).toEqual("room-a@example.com");
    });
  });
});
