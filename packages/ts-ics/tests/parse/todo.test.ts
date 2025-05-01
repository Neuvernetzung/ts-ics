import { generateIcsTodo } from "@/lib";
import { convertIcsTodo } from "@/lib/parse/todo";
import type { IcsTodo } from "@/types";
import { icsTestData } from "../utils";
import { z } from "zod";

it("Test Ics Todo Parse", async () => {
  const todo = icsTestData([
    "BEGIN:VTODO",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DUE:19970903T190000Z",
    "RECURRENCE-ID:19970903T163000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VTODO",
  ]);
  expect(() => convertIcsTodo(undefined, todo)).not.toThrow();
});

it("Test Ics Todo Parse", async () => {
  const todo = icsTestData([
    "BEGIN:VTODO",
    "UID:19970901T130000Z-123402@example.com",
    "DTSTAMP:19970901T130000Z",
    "DUE:19970402T010000Z",
    "SUMMARY:Laurel is in sensitivity awareness class.",
    "CLASS:PUBLIC",
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VTODO",
  ]);
  expect(() => convertIcsTodo(undefined, todo)).not.toThrow();
});

it("Test Ics Todo Parse", async () => {
  const todo = icsTestData([
    "BEGIN:VTODO",
    "UID:19970901T130000Z-123403@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART;VALUE=DATE:19971102",
    "DURATION:P1D",
    "SUMMARY:Our Blissful Anniversary",
    "CLASS:CONFIDENTIAL",
    "CATEGORIES:ANNIVERSARY,PERSONAL,SPECIAL OCCASION",
    "RRULE:FREQ=YEARLY",
    "END:VTODO",
  ]);
  expect(() => convertIcsTodo(undefined, todo)).not.toThrow();
});

it("Test Ics Todo Parse", async () => {
  const todo = icsTestData([
    "BEGIN:VTODO",
    "UID:20070423T123432Z-541111@example.com",
    "DTSTAMP:20070423T123432Z",
    "DUE;VALUE=DATE:20070709",
    "SUMMARY:Festival International de Jazz de Montreal",
    "END:VTODO",
  ]);

  expect(() => convertIcsTodo(undefined, todo)).not.toThrow();
});

it("Test Ics Todo Parse - recurrenceId gh#140", async () => {
  const todo = icsTestData([
    "BEGIN:VTODO",
    "UID:20070423T123432Z-541111@example.com",
    "DTSTAMP:20070423T123432Z",
    "DUE;VALUE=DATE:20070709",
    "SUMMARY:Festival International de Jazz de Montreal",
    "RECURRENCE-ID:19970903T163000Z",
    "END:VTODO",
  ]);

  expect(() => convertIcsTodo(undefined, todo)).not.toThrow();
});

it("Expect 'formatLines' to handle multiple line breaks correctly", async () => {
  const todo: IcsTodo = {
    stamp: { date: new Date("2024-08-23T22:00:00Z") },
    summary: "Holiday",
    uid: "123",
    description:
      "Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
    due: { date: new Date("2024-09-06T21:00:00Z") },
  };

  const generatedTodo = generateIcsTodo(todo);

  expect(() => convertIcsTodo(undefined, generatedTodo)).not.toThrow();

  const parsed = convertIcsTodo(undefined, generatedTodo);

  expect(parsed.description).toEqual(todo.description);
});

it("Test non standard value", async () => {
  const nonStandardValue = "yeah";

  const todoString = icsTestData([
    "BEGIN:VTODO",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DUE:19970903T190000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    `X-WTF:${nonStandardValue}`,
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VTODO",
  ]);

  const todo = convertIcsTodo(undefined, todoString, {
    nonStandard: {
      wtf: {
        name: "X-WTF",
        convert: (line) => line.value,
        schema: z.string(),
      },
    },
  });

  expect(todo.nonStandard?.wtf).toBe(nonStandardValue);
});
