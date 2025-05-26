import { formatLines } from "./formatLines";
import { icsTestData } from "../../../../tests/utils";

it("Correcly break lines longer than the max line length", async () => {
  const unformatted = `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US???(cn=John%20Smith)":mailto:jsmith@example.com`;

  const formatted = icsTestData([
    `ORGANIZER;CN=JohnSmith;DIR="ldap://example.com:6666/o=DC%20Associates,c=US?`,
    ` ??(cn=John%20Smith)":mailto:jsmith@example.com`,
  ]);

  expect(formatLines(unformatted)).toEqual(formatted);
});

it("Correctly handle LF line breaks", async () => {
  const unformatted =
    "DESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User";

  const formatted = icsTestData([
    "DESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to disc",
    " uss the information regarding the administration of travel documents for th",
    " e trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
  ]);

  expect(formatLines(unformatted)).toEqual(formatted);
});

it("Correctly handles escaped newlines in description - gh#183", async () => {
  const unformatted = "DESCRIPTION:Test\n\\nb";

  const formatted = icsTestData(["DESCRIPTION:Test\n\\nb"]);

  expect(formatLines(unformatted)).toStrictEqual(formatted);
});
