import { splitLines } from "./splitLines";
import { icsTestData } from "../../../../tests/utils";
import { LF_BREAK } from "@/constants";

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

it("Correctly handle LF line breaks - when importing as LF (Linux readFile)", async () => {
  const formatted = [
    "DTSTART;VALUE=DATE:20070628",
    "DESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to disc",
    " uss the information regarding the administration of travel documents for th",
    " e trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
    "TRANSP:TRANSPARENT",
  ].join(LF_BREAK);

  const unformatted =
    "DTSTART;VALUE=DATE:20070628\nDESCRIPTION:Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User\nTRANSP:TRANSPARENT";

  expect(splitLines(formatted).join(LF_BREAK)).toEqual(unformatted);
});

it("Correct removal of leading and trailing line breaks - if there is more than one", async () => {
  const formatted = icsTestData([
    "",
    "",
    "",
    "PRODID:ID",
    "VERSION:2.0",
    "",
    "",
    "",
  ]);

  const lines = splitLines(formatted);

  expect(lines[0]).not.toEqual("\n");
  expect(lines[lines.length - 1].endsWith("\n")).toEqual(false);
});
