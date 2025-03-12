import { getLine } from "@/lib/parse/utils/line";

import { convertIcsAttendee } from "@/lib/parse/attendee";

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
