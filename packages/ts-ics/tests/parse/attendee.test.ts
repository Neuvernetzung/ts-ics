import { getLine } from "@/lib/parse/utils/line";

import { icsAttendeeToObject } from "@/lib/parse/attendee";

it("Test Ics Attendee Parse", async () => {
  const attendee = `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`;

  const { line } = getLine(attendee);

  expect(() => icsAttendeeToObject(line, undefined)).not.toThrow();
});

it("Test Ics Attendee Parse", async () => {
  const attendee = `ATTENDEE;ROLE=REQ-PARTICIPANT;DELEGATED-FROM="mailto:bob@example.com";PARTSTAT=ACCEPTED;CN=Jane Doe:mailto:jdoe@example.com`;

  const { line } = getLine(attendee);

  const parsed = icsAttendeeToObject(line, undefined);

  expect(() => parsed).not.toThrow();

  expect(parsed).toEqual({
    role: "REQ-PARTICIPANT",
    delegatedFrom: "bob@example.com",
    partstat: "ACCEPTED",
    name: "Jane Doe",
    email: "jdoe@example.com",
  });
});
