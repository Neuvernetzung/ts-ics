import { generateIcsJournal } from "@/lib";
import type { IcsJournal } from "@/types";

it("Generate non standard value", () => {
  const date = new Date(2025, 2, 13);

  const journal: IcsJournal = {
    nonStandard: { wtf: "yeah" },
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
  };

  const journalString = generateIcsJournal<{ wtf: string }>(journal, {
    nonStandard: {
      wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
    },
  });

  expect(journalString).toContain("X-WTF:yeah");
});

it("Generate journal - handle RECURRENCE-ID correctly gh#159", () => {
  const date = new Date("2025-02-20T00:00:00Z");

  const journal: IcsJournal = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    recurrenceId: { value: { date }, range: "THISANDFUTURE" },
  };

  const journalString = generateIcsJournal(journal);

  expect(journalString).not.toContain("RECURRENCE-ID:[object Object]");
  expect(journalString).toContain(
    "RECURRENCE-ID;RANGE=THISANDFUTURE:20250220T000000Z"
  );
});

describe("Ensure Stamp is always generated in UTC Format", () => {
  // DTSTAMP MUST be in UTC - https://www.rfc-editor.org/rfc/rfc5545#section-3.8.7.2
  const utcDate = new Date("2025-02-20T00:00:00Z");
  const localDate = new Date("2025-02-20T12:00:00+0200");

  it("utc date", () => {
    const journal: IcsJournal = {
      stamp: { date: utcDate },
      start: { date: utcDate },
      summary: "123",
      uid: "123",
    };

    const journalString = generateIcsJournal(journal);

    expect(journalString).toContain("DTSTAMP:20250220T000000Z");
  });

  it("local date", () => {
    const journal: IcsJournal = {
      stamp: { date: localDate },
      start: { date: utcDate },
      summary: "123",
      uid: "123",
    };

    const journalString = generateIcsJournal(journal);

    expect(journalString).toContain("DTSTAMP:20250220T100000Z");
  });

  it("specified in local date", () => {
    const journal: IcsJournal = {
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
    };

    const journalString = generateIcsJournal(journal);

    expect(journalString).toContain("DTSTAMP:20250220T000000Z");
  });
});

it("SEQUENCE is generated correctly gh#174", () => {
  const date = new Date("2025-02-20T00:00:00Z");

  const journal: IcsJournal = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    sequence: 0,
  };

  const journalString = generateIcsJournal(journal);

  expect(journalString).toContain("SEQUENCE:0");
});
