import { generateIcsEvent } from "@/lib";
import { IcsEvent } from "@/types";

it("Generate non standard value", () => {
  const date = new Date(2025, 13, 2);

  const event: IcsEvent = {
    nonStandard: { wtf: "yeah" },
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    duration: { days: 2 },
  };

  const eventString = generateIcsEvent<{ wtf: string }>(event, {
    nonStandard: {
      wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
    },
  });

  expect(eventString).toContain("X-WTF:yeah");
});
