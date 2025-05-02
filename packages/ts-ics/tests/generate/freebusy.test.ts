import { generateIcsFreeBusy } from "@/lib";
import type { IcsFreeBusy } from "@/types";
import { addHours } from "date-fns";

it("Generate non standard value", () => {
  const date = new Date(2025, 2, 13);

  const freeBusy: IcsFreeBusy = {
    nonStandard: { wtf: "yeah" },
    stamp: { date },
    start: { date },
    uid: "123",
  };

  const freeBusyString = generateIcsFreeBusy<{ wtf: string }>(freeBusy, {
    nonStandard: {
      wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
    },
  });

  expect(freeBusyString).toContain("X-WTF:yeah");
});

describe("Ensure Stamp is always generated in UTC Format", () => {
  // DTSTAMP MUST be in UTC - https://www.rfc-editor.org/rfc/rfc5545#section-3.8.7.2
  const utcDate = new Date("2025-02-20T00:00:00Z");
  const localDate = new Date("2025-02-20T12:00:00+0200");

  it("utc date", () => {
    const freeBusy: IcsFreeBusy = {
      stamp: { date: utcDate },
      start: { date: utcDate },
      uid: "123",
    };

    const freeBusyString = generateIcsFreeBusy(freeBusy);

    expect(freeBusyString).toContain("DTSTAMP:20250220T000000Z");
  });

  it("local date", () => {
    const freeBusy: IcsFreeBusy = {
      stamp: { date: localDate },
      start: { date: utcDate },
      uid: "123",
    };

    const freeBusyString = generateIcsFreeBusy(freeBusy);

    expect(freeBusyString).toContain("DTSTAMP:20250220T100000Z");
  });

  it("specified in local date", () => {
    const freeBusy: IcsFreeBusy = {
      stamp: {
        date: utcDate,
        local: {
          date: localDate,
          timezone: "Europe/Berlin",
          tzoffset: "+0200",
        },
      },
      start: { date: utcDate },
      uid: "123",
    };

    const freeBusyString = generateIcsFreeBusy(freeBusy);

    expect(freeBusyString).toContain("DTSTAMP:20250220T000000Z");
  });
});

it("Generates FreeBusy Start and Duration correctly", () => {
  const utcDate = new Date("1997-03-08T16:00:00Z");

  const freeBusy: IcsFreeBusy = {
    stamp: {
      date: utcDate,
    },
    start: { date: utcDate },
    uid: "123",
    freeBusy: [
      {
        type: "BUSY-UNAVAILABLE",
        values: [{ start: utcDate, duration: { hours: 8, minutes: 30 } }],
      },
    ],
  };

  const freeBusyString = generateIcsFreeBusy(freeBusy);

  expect(freeBusyString).toContain(
    "FREEBUSY;FBTYPE=BUSY-UNAVAILABLE:19970308T160000Z/PT8H30M"
  );
});

it("Generates FreeBusy Start and End correctly", () => {
  const utcDate = new Date("1997-03-08T16:00:00Z");
  const utcEndDate = addHours(utcDate, 1);

  const freeBusy: IcsFreeBusy = {
    stamp: {
      date: utcDate,
    },
    start: { date: utcDate },
    uid: "123",
    freeBusy: [
      {
        type: "BUSY-UNAVAILABLE",
        values: [{ start: utcDate, end: utcEndDate }],
      },
    ],
  };

  const freeBusyString = generateIcsFreeBusy(freeBusy);

  expect(freeBusyString).toContain(
    "FREEBUSY;FBTYPE=BUSY-UNAVAILABLE:19970308T160000Z/19970308T170000Z"
  );
});

it("Generates FreeBusy multiple values", () => {
  const utcDate = new Date("1997-03-08T16:00:00Z");
  const freeBusy2Date = new Date("1997-03-08T20:00:00Z");
  const freeBusy3Date = new Date("1997-03-08T23:00:00Z");
  const freeBusy3EndDate = new Date("1997-03-09T00:00:00Z");

  const freeBusy: IcsFreeBusy = {
    stamp: {
      date: utcDate,
    },
    start: { date: utcDate },
    uid: "123",
    freeBusy: [
      {
        type: "FREE",
        values: [
          { start: utcDate, duration: { hours: 3 } },
          { start: freeBusy2Date, duration: { hours: 1 } },
          { start: freeBusy3Date, end: freeBusy3EndDate },
        ],
      },
    ],
  };

  const freeBusyString = generateIcsFreeBusy(freeBusy);

  expect(freeBusyString).toContain(
    "FREEBUSY;FBTYPE=FREE:19970308T160000Z/PT3H,19970308T200000Z/PT1H,19970308T2\r\n 30000Z/19970309T000000Z"
  );
});

it("Generates multiple FreeBusy fields", () => {
  const utcDate = new Date("1997-03-08T16:00:00Z");
  const freeBusy2Date = new Date("1997-03-08T20:00:00Z");

  const freeBusy: IcsFreeBusy = {
    stamp: {
      date: utcDate,
    },
    start: { date: utcDate },
    uid: "123",
    freeBusy: [
      {
        type: "FREE",
        values: [{ start: utcDate, duration: { hours: 3 } }],
      },
      {
        type: "BUSY",
        values: [{ start: freeBusy2Date, duration: { hours: 1 } }],
      },
    ],
  };

  const freeBusyString = generateIcsFreeBusy(freeBusy);

  expect(freeBusyString).toContain(
    "FREEBUSY;FBTYPE=FREE:19970308T160000Z/PT3H\r\nFREEBUSY;FBTYPE=BUSY:19970308T200000Z/PT1H"
  );
});
