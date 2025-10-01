import { generateIcsTimezoneProp } from "@/lib";
import type { IcsTimezoneProp } from "@/types";

it("Generate non standard value", () => {
  const date = new Date(2025, 13, 2);

  const timezoneProp: IcsTimezoneProp = {
    nonStandard: { wtf: "yeah" },
    type: "STANDARD",
    offsetFrom: "-0500",
    offsetTo: "-0400",
    start: date,
  };

  const timezonePropString = generateIcsTimezoneProp<{ wtf: string }>(
    timezoneProp,
    {
      nonStandard: {
        wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
      },
    }
  );

  expect(timezonePropString).toContain("X-WTF:yeah");
});

it("Generate DTSTART - MUST be specified as a date with a local time value - gh#232", () => {
  const date = new Date("2025-10-01T12:00:00-04:00");

  const timezoneProp: IcsTimezoneProp = {
    type: "STANDARD",
    offsetFrom: "-0500",
    offsetTo: "-0400",
    start: date,
  };

  const timezonePropString = generateIcsTimezoneProp(timezoneProp);

  expect(timezonePropString).toContain("DTSTART:20251001T120000");
});
