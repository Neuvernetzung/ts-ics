import { escapeTextString } from "./escapeText";

it("TEXT Location is escaped correctly", () => {
  const location = "Alt-Moabit 140, 10557 Berlin, Germany";

  const escapedLocation = escapeTextString(location);

  expect(escapedLocation).toEqual("Alt-Moabit 140\\, 10557 Berlin\\, Germany");
});

it("TEXT Description is escaped correctly", async () => {
  const description = `Comma, multiple Commas,,, SemiColon; multiple Semicolons;;; line Break
multiple Line Breaks


end of the description.`;

  const escapedDescription = escapeTextString(description);

  expect(escapedDescription).toEqual(
    "Comma\\, multiple Commas\\,\\,\\, SemiColon\\; multiple Semicolons\\;\\;\\; line Break\nmultiple Line Breaks\n\n\nend of the description."
  );
});
