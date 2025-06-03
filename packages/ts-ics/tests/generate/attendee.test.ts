import { generateIcsAttendee } from "@/lib";
import { IcsAttendee } from "@/types";

it("Dont generate attendee role twice - #194", () => {
  const attendee: IcsAttendee = {
    email: "w@w.com",
    role: "REQ-PARTICIPANT",
  };

  const attendeeString = generateIcsAttendee(attendee, "ATTENDEE");

  expect(attendeeString).toContain(
    "ATTENDEE;ROLE=REQ-PARTICIPANT:MAILTO:w@w.com"
  );
  expect(attendeeString).not.toContain(
    "ATTENDEE;ROLE=REQ-PARTICIPANT;ROLE=REQ-PARTICIPANT:MAILTO:w@w.com"
  );
});

describe("Generate RSPV Param - #194", () => {
  it("RSVP=TRUE", () => {
    const attendee: IcsAttendee = {
      email: "w@w.com",
      role: "REQ-PARTICIPANT",
      rsvp: true,
    };

    const attendeeString = generateIcsAttendee(attendee, "ATTENDEE");

    expect(attendeeString).toContain("RSVP=TRUE");
  });

  it("RSVP=FALSE", () => {
    const attendee: IcsAttendee = {
      email: "w@w.com",
      role: "REQ-PARTICIPANT",
      rsvp: false,
    };

    const attendeeString = generateIcsAttendee(attendee, "ATTENDEE");

    expect(attendeeString).toContain("RSVP=FALSE");
  });
});
