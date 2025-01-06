import { unescapeTextString } from "./unescapeText";

it("TEXT Location is escaped correctly", () => {
  const escapedLocation = "Alt-Moabit 140\\, 10557 Berlin\\, Germany";

  const location = unescapeTextString(escapedLocation);

  expect(location).toEqual("Alt-Moabit 140, 10557 Berlin, Germany");
});

it("TEXT Description is escaped correctly", async () => {
  const escapedDescription =
    "Comma\\, multiple Commas\\,\\,\\, SemiColon\\; multiple Semicolons\\;\\;\\; line Break\nmultiple Line Breaks\n\n\nend of the description.";

  const description = unescapeTextString(escapedDescription);

  expect(description).toEqual(
    `Comma, multiple Commas,,, SemiColon; multiple Semicolons;;; line Break
multiple Line Breaks


end of the description.`
  );
});
