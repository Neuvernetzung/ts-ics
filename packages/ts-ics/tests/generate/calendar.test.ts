import { CRLF_BREAK } from "@/constants";
import { generateIcsCalendar } from "@/lib";
import type { IcsCalendar, IcsEvent } from "@/types";

it("Long descriptions are correctly folded - gh#141", async () => {
  const date = new Date(2025, 0, 19);

  const event: IcsEvent = {
    start: { date },
    stamp: { date },
    end: { date },
    summary: "Title",
    uid: "1",
    description:
      "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  };

  const calendar: IcsCalendar = {
    prodId: "1",
    version: "2.0",
    events: [event],
  };

  const icsCalendar = generateIcsCalendar(calendar);

  expect(icsCalendar.includes(` W${CRLF_BREAK}`)).toBeFalsy(); // Calendar should not be folded again after it was folded already in generateEvent
  expect(
    icsCalendar.includes(
      `DESCRIPTION:WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW${CRLF_BREAK} WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW${CRLF_BREAK} WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW${CRLF_BREAK}`
    )
  ).toBeTruthy();
});
