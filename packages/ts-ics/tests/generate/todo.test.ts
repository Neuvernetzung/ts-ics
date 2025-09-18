import { generateIcsTodo } from "@/lib";
import type { IcsTodo } from "@/types";

it("Generate non standard value", () => {
  const date = new Date(2025, 2, 13);

  const todo: IcsTodo = {
    nonStandard: { wtf: "yeah" },
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    duration: { days: 2 },
  };

  const todoString = generateIcsTodo<{ wtf: string }>(todo, {
    nonStandard: {
      wtf: { name: "X-WTF", generate: (v) => ({ value: v.toString() }) },
    },
  });

  expect(todoString).toContain("X-WTF:yeah");
});

it("Generate todo - handle RECURRENCE-ID correctly gh#159", () => {
  const date = new Date("2025-02-20T00:00:00Z");

  const todo: IcsTodo = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    recurrenceId: { value: { date }, range: "THISANDFUTURE" },
    duration: { days: 2 },
  };

  const todoString = generateIcsTodo(todo);

  expect(todoString).not.toContain("RECURRENCE-ID:[object Object]");
  expect(todoString).toContain(
    "RECURRENCE-ID;RANGE=THISANDFUTURE:20250220T000000Z"
  );
});

describe("Ensure Stamp is always generated in UTC Format", () => {
  // DTSTAMP MUST be in UTC - https://www.rfc-editor.org/rfc/rfc5545#section-3.8.7.2
  const utcDate = new Date("2025-02-20T00:00:00Z");
  const localDate = new Date("2025-02-20T12:00:00+0200");

  it("utc date", () => {
    const todo: IcsTodo = {
      stamp: { date: utcDate },
      start: { date: utcDate },
      summary: "123",
      uid: "123",
      duration: { days: 2 },
    };

    const todoString = generateIcsTodo(todo);

    expect(todoString).toContain("DTSTAMP:20250220T000000Z");
  });

  it("local date", () => {
    const todo: IcsTodo = {
      stamp: { date: localDate },
      start: { date: utcDate },
      summary: "123",
      uid: "123",
      duration: { days: 2 },
    };

    const todoString = generateIcsTodo(todo);

    expect(todoString).toContain("DTSTAMP:20250220T100000Z");
  });

  it("specified in local date", () => {
    const todo: IcsTodo = {
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

    const todoString = generateIcsTodo(todo);

    expect(todoString).toContain("DTSTAMP:20250220T000000Z");
  });
});

it("SEQUENCE is generated correctly gh#174", () => {
  const date = new Date("2025-02-20T00:00:00Z");

  const todo: IcsTodo = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    duration: { days: 2 },
    sequence: 0,
  };

  const todoString = generateIcsTodo(todo);

  expect(todoString).toContain("SEQUENCE:0\r\n");
});

it("PERCENT-COMPLETE is generated correctly", () => {
  const date = new Date("2025-02-20T00:00:00Z");

  const todo: IcsTodo = {
    stamp: { date },
    start: { date },
    summary: "123",
    uid: "123",
    duration: { days: 2 },
    percentComplete: 25,
  };

  const todoString = generateIcsTodo(todo);

  expect(todoString).toContain("PERCENT-COMPLETE:25\r\n");
});
