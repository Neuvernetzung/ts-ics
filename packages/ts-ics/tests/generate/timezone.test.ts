import { generateIcsTimezone } from "@/lib";
import { IcsTimezone } from "@/types";

it("Generate non standard value", () => {
  const timezone: IcsTimezone = {
    nonStandard: { wtf: "yeah" },
    id: "1",
    props: [],
  };

  const timezoneString = generateIcsTimezone<{ wtf: string }>(timezone, {
    nonStandard: {
      wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
    },
  });

  expect(timezoneString).toContain("X-WTF:yeah");
});
