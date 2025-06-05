import { LF_BREAK } from "@/constants";
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

describe("Ensure Stamp is always generated in UTC Format", () => {
  // DTSTAMP MUST be in UTC - https://www.rfc-editor.org/rfc/rfc5545#section-3.8.7.2
  const utcDate = new Date("2025-02-20T00:00:00Z");
  const localDate = new Date("2025-02-20T12:00:00+0200");

  it("utc date", () => {
    const event: IcsEvent = {
      stamp: { date: utcDate },
      start: { date: utcDate },
      summary: "123",
      uid: "123",
      duration: { days: 2 },
    };

    const eventString = generateIcsEvent(event);

    expect(eventString).toContain("DTSTAMP:20250220T000000Z");
  });

  it("local date", () => {
    const event: IcsEvent = {
      stamp: { date: localDate },
      start: { date: utcDate },
      summary: "123",
      uid: "123",
      duration: { days: 2 },
    };

    const eventString = generateIcsEvent(event);

    expect(eventString).toContain("DTSTAMP:20250220T100000Z");
  });

  it("specified in local date", () => {
    const event: IcsEvent = {
      stamp: {
        date: utcDate,
        local: {
          date: localDate,
          timezone: "Europe/Berlin",
          tzoffset: "+0200",
        },
      },
      start: { date: utcDate },
      summary: "123",
      uid: "123",
      duration: { days: 2 },
    };

    const eventString = generateIcsEvent(event);

    expect(eventString).toContain("DTSTAMP:20250220T000000Z");
  });
});

it("SEQUENCE is generated correctly gh#174", () => {
  const date = new Date("2025-02-20T00:00:00Z");

  const event: IcsEvent = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    duration: { days: 2 },
    sequence: 0,
  };

  const eventString = generateIcsEvent(event);

  expect(eventString).toContain("SEQUENCE:0");
});

it("Generate Description AltRep - gh#197", () => {
  const date = new Date(2025, 2, 13);

  const event: IcsEvent = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    duration: { days: 2 },
    descriptionAltRep: "data:text/html,%3Cb%3Erich%3C%2Fb%3E",
    description: "rich",
  };

  const eventString = generateIcsEvent(event);

  expect(eventString).toContain(
    `DESCRIPTION;ALTREP="data:text/html,%3Cb%3Erich%3C%2Fb%3E":rich`
  );
});
