import { getLine } from "@/lib/parse/utils/line";

import { convertIcsAttendee } from "@/lib/parse/attendee";
import { IcsAttendee } from "@/types";

it("Test Ics IcsAttendee Parse", async () => {
  const attendee = `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`;

  const { line } = getLine(attendee);

  expect(() => convertIcsAttendee(undefined, line)).not.toThrow();
});

it("Test Ics IcsAttendee Parse", async () => {
  const attendee = `ATTENDEE;ROLE=REQ-PARTICIPANT;DELEGATED-FROM="mailto:bob@example.com";PARTSTAT=ACCEPTED;CN=Jane Doe:mailto:jdoe@example.com`;

  const { line } = getLine(attendee);

  const parsed = convertIcsAttendee(undefined, line);

  expect(() => parsed).not.toThrow();

  expect(parsed).toEqual({
    role: "REQ-PARTICIPANT",
    delegatedFrom: "bob@example.com",
    partstat: "ACCEPTED",
    name: "Jane Doe",
    email: "jdoe@example.com",
  });
});

describe("Parse RSPV Param - #194", () => {
  it("RSVP=TRUE", () => {
    const attendeeString =
      "ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT:MAILTO:w@w.com";

    const { line } = getLine(attendeeString);

    const attendee = convertIcsAttendee(undefined, line);

    expect(attendee.rsvp).toEqual(true);
  });

  it("RSVP=FALSE", () => {
    const attendeeString =
      "ATTENDEE;RSVP=FALSE;ROLE=REQ-PARTICIPANT:MAILTO:w@w.com";

    const { line } = getLine(attendeeString);

    const attendee = convertIcsAttendee(undefined, line);

    expect(attendee.rsvp).toEqual(false);
  });
});
