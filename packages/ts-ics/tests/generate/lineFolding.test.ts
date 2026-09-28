import { Buffer } from "node:buffer";
import { CRLF_BREAK, MAX_LINE_LENGTH } from "@/constants";
import {
  convertIcsCalendar,
  convertIcsEvent,
  generateIcsCalendar,
  generateIcsEvent,
} from "@/lib";
import type { IcsEvent } from "@/types";

const values = [
  ["ASCII continuation lines", "a".repeat(230)],
  ["two byte characters", "é".repeat(70)],
  ["three byte characters", "漢".repeat(50)],
  ["surrogate pair at a fold", `${"a".repeat(66)}🎾 event`],
  ["mixed Unicode", "Résumé 漢字 🎾 ".repeat(9)],
  ["escaped text", "é;漢,🎾\\\n".repeat(15)],
];

describe.each(["event", "calendar"])("%s line folding", (component) => {
  it.each(values)("Preserves %s through UTF-8 export", (_name, summary) => {
    const date = new Date("2025-05-01T12:00:00Z");
    const event: IcsEvent = {
      uid: "folding@example.com",
      stamp: { date },
      start: { date },
      duration: { hours: 1 },
      summary,
      description: summary,
    };
    const generated =
      component === "event"
        ? generateIcsEvent(event)
        : generateIcsCalendar({
            prodId: "line folding test",
            version: "2.0",
            events: [event],
          });
    const exported = Buffer.from(generated, "utf8").toString("utf8");
    const parsed =
      component === "event"
        ? convertIcsEvent(undefined, exported)
        : convertIcsCalendar(undefined, exported).events?.[0];

    expect(parsed?.summary).toEqual(summary);
    expect(parsed?.description).toEqual(summary);
    for (const line of exported.split(CRLF_BREAK)) {
      expect(Buffer.byteLength(line, "utf8")).toBeLessThanOrEqual(MAX_LINE_LENGTH);
    }
  });
});
