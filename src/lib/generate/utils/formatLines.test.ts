import { BREAK } from "@/constants";
import { formatLines } from "./formatLines";

it("Test Ics Alarm Parse", async () => {
  const unformatted = `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US???(cn=John%20Smith)":mailto:jsmith@example.com`;

  const formatted = [
    `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US?`,
    ` ??(cn=John%20Smith)":mailto:jsmith@example.com`,
  ].join(BREAK);

  expect(formatLines(unformatted)).toEqual(formatted);
});
