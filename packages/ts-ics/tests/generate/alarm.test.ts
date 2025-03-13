import { generateIcsAlarm } from "@/lib";
import { IcsAlarm } from "@/types";

it("Generate non standard value", () => {
  const alarm: IcsAlarm = {
    trigger: { type: "relative", value: { days: 2 } },
    nonStandard: { wtf: "yeah" },
  };

  const alarmString = generateIcsAlarm<{ wtf: string }>(alarm, {
    nonStandard: {
      wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
    },
  });

  expect(alarmString).toContain("X-WTF:yeah");
});
