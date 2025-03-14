import { generateIcsTimezoneProp } from "@/lib";
import { IcsTimezoneProp } from "@/types";

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
