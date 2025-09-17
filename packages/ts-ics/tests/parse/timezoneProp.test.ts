import { convertIcsTimezoneProp } from "@/lib";
import { icsTestData } from "../utils";
import { z } from "zod";

it("Type is correctly set - DAYLIGHT", async () => {
  const timeZonePropString = icsTestData([
    "BEGIN:DAYLIGHT",
    "DTSTART:20070311T020000",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:DAYLIGHT",
  ]);

  const timeZoneProp = convertIcsTimezoneProp(undefined, timeZonePropString);

  expect(timeZoneProp.type).toBe("DAYLIGHT");
});

it("Type is correctly set - STANDARD", async () => {
  const timeZonePropString = icsTestData([
    "BEGIN:STANDARD",
    "DTSTART:20070311T020000",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    "END:STANDARD",
  ]);

  const timeZoneProp = convertIcsTimezoneProp(undefined, timeZonePropString);

  expect(timeZoneProp.type).toBe("STANDARD");
});

it("Test non standard value", async () => {
  const nonStandardValue = "yeah";

  const timeZonePropString = icsTestData([
    "BEGIN:DAYLIGHT",
    "DTSTART:20070311T020000",
    "TZOFFSETFROM:-0500",
    "TZOFFSETTO:-0400",
    "TZNAME:EDT",
    `X-WTF:${nonStandardValue}`,
    "END:DAYLIGHT",
  ]);

  const timeZoneProp = convertIcsTimezoneProp(undefined, timeZonePropString, {
    nonStandard: {
      wtf: {
        name: "X-WTF",
        convert: (line) => line.value,
        schema: z.string(),
      },
    },
  });

  expect(timeZoneProp.nonStandard?.wtf).toBe(nonStandardValue);
});
