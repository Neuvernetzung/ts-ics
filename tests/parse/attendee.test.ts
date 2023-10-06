import { getLine } from "@/lib/parse/utils/line";

import { parseIcsAttendee } from "../..";

it("Test Ics Attendee Parse", async () => {
  const attendee = `ATTENDEE;MEMBER="mailto:DEV-GROUP@example.com":mailto:joecool@example.com`;

  const { value, options } = getLine(attendee);

  expect(() => parseIcsAttendee(value, options)).not.toThrowError();
});

it("Test Ics Attendee Parse", async () => {
  const attendee = `ATTENDEE;ROLE=REQ-PARTICIPANT;DELEGATED-FROM="mailto:bob@example.com";PARTSTAT=ACCEPTED;CN=Jane Doe:mailto:jdoe@example.com`;

  const { value, options } = getLine(attendee);

  expect(() => parseIcsAttendee(value, options)).not.toThrowError();
});
