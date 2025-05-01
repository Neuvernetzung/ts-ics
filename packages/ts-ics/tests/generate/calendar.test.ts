import { CRLF_BREAK } from "@/constants";
import { generateIcsCalendar } from "@/lib";
import type { GenerateNonStandardValues, IcsCalendar, IcsEvent } from "@/types";

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

describe("Generate non standard value", () => {
  const nonStandard = {
    wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
  } satisfies GenerateNonStandardValues<{ wtf: string }>;

  it("in calendar", () => {
    const calendar: IcsCalendar = {
      prodId: "abc",
      version: "2.0",
      nonStandard: { wtf: "yeah" },
    };

    const calendarString = generateIcsCalendar<{ wtf: string }>(calendar, {
      nonStandard,
    });

    expect(calendarString).toContain("X-WTF:yeah");
  });

  it("in nested event", () => {
    const date = new Date(2025, 3, 13);

    const calendar: IcsCalendar = {
      prodId: "abc",
      version: "2.0",
      events: [
        {
          start: { date },
          stamp: { date },
          end: { date },
          summary: "Title",
          uid: "1",
          description: "1",
          nonStandard: { wtf: "yeah" },
        },
      ],
    };

    const calendarString = generateIcsCalendar<{ wtf: string }>(calendar, {
      nonStandard,
    });

    expect(calendarString).toContain("X-WTF:yeah");
  });

  it("in nested alarm", () => {
    const date = new Date(2025, 3, 13);

    const calendar: IcsCalendar = {
      prodId: "abc",
      version: "2.0",
      events: [
        {
          start: { date },
          stamp: { date },
          end: { date },
          summary: "Title",
          uid: "1",
          description: "1",
          alarms: [
            {
              trigger: { type: "relative", value: { days: 1 } },
              nonStandard: { wtf: "yeah" },
            },
          ],
        },
      ],
    };

    const calendarString = generateIcsCalendar<{ wtf: string }>(calendar, {
      nonStandard,
    });

    expect(calendarString).toContain("X-WTF:yeah");
  });

  it("in nested timezone", () => {
    const calendar: IcsCalendar = {
      prodId: "abc",
      version: "2.0",
      timezones: [{ id: "1", props: [], nonStandard: { wtf: "yeah" } }],
    };

    const calendarString = generateIcsCalendar<{ wtf: string }>(calendar, {
      nonStandard,
    });

    expect(calendarString).toContain("X-WTF:yeah");
  });

  it("in nested timezone prop", () => {
    const date = new Date(2025, 3, 13);

    const calendar: IcsCalendar = {
      prodId: "abc",
      version: "2.0",
      timezones: [
        {
          id: "1",
          props: [
            {
              offsetFrom: "+0200",
              offsetTo: "+0300",
              start: date,
              type: "DAYLIGHT",
              nonStandard: { wtf: "yeah" },
            },
          ],
        },
      ],
    };

    const calendarString = generateIcsCalendar<{ wtf: string }>(calendar, {
      nonStandard,
    });

    expect(calendarString).toContain("X-WTF:yeah");
  });
});

it("Generates Todo inside calendar", () => {
  const date = new Date(2025, 4, 1);

  const calendar: IcsCalendar = {
    prodId: "abc",
    version: "2.0",
    todos: [
      {
        uid: "123",
        stamp: { date },
        due: { date },
      },
    ],
  };

  const calendarString = generateIcsCalendar(calendar);

  expect(calendarString).toContain("BEGIN:VTODO");
  expect(calendarString).toContain("END:VTODO");
});

it("Generates Journal inside calendar", () => {
  const date = new Date(2025, 4, 1);

  const calendar: IcsCalendar = {
    prodId: "abc",
    version: "2.0",
    journals: [
      {
        uid: "123",
        stamp: { date },
      },
    ],
  };

  const calendarString = generateIcsCalendar(calendar);

  expect(calendarString).toContain("BEGIN:VJOURNAL");
  expect(calendarString).toContain("END:VJOURNAL");
});
