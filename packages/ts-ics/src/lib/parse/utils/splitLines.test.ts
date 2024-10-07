import { splitLines } from "./splitLines";
import { icsTestData } from "../../../../tests/utils";

it("Correcly merge lines longer than the max line length", async () => {
  const formatted = icsTestData([
    `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US?`,
    ` ??(cn=John%20Smith)":mailto:jsmith@example.com`,
  ]);

  const unformatted = `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US???(cn=John%20Smith)":mailto:jsmith@example.com`;

  expect(splitLines(formatted)[0]).toEqual(unformatted);
});

it("Correctly handle LF line breaks", async () => {
  const formatted = icsTestData([
    "DESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to disc",
    " uss the information regarding the administration of travel documents for th",
    " e trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
  ]);

  const unformatted =
    "DESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User";

  expect(splitLines(formatted)[0]).toEqual(unformatted);
});
