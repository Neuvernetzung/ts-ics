import { generateIcsEvent } from "@/lib";
import type { IcsEvent } from "@/types";

it("Generate non standard value", () => {
  const date = new Date(2025, 2, 13);

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

it("Generate event - handle RECURRENCE-ID correctly gh#159", () => {
  const date = new Date("2025-02-20T00:00:00Z");

  const event: IcsEvent = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    recurrenceId: { value: { date }, range: "THISANDFUTURE" },
    duration: { days: 2 },
  };

  const eventString = generateIcsEvent(event);

  expect(eventString).not.toContain("RECURRENCE-ID:[object Object]");
  expect(eventString).toContain(
    "RECURRENCE-ID;RANGE=THISANDFUTURE:20250220T000000Z"
  );
});
