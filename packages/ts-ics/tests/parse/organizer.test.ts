import { getLine } from "@/lib/parse/utils/line";

import { convertIcsOrganizer } from "@/lib/parse/organizer";

it("Test Ics Organizer Parse", async () => {
  const organizer = `ORGANIZER;CN=John Smith:mailto:jsmith@example.com`;

  const { line } = getLine(organizer);

  expect(() => convertIcsOrganizer(undefined, line)).not.toThrow();
});

it("Test Ics Organizer Parse", async () => {
  const organizer = `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US???(cn=John%20Smith)":mailto:jsmith@example.com`;

  const { line } = getLine(organizer);

  expect(() => convertIcsOrganizer(undefined, line)).not.toThrow();
});

it("Test Ics Organizer Parse", async () => {
  const organizer = `ORGANIZER;SENT-BY="mailto:jane_doe@example.com":mailto:jsmith@example.com`;

  const { line } = getLine(organizer);

  expect(() => convertIcsOrganizer(undefined, line)).not.toThrow();
});
