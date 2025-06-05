import { generateIcsEvent } from "@/lib";
import { convertIcsEvent } from "@/lib/parse/event";
import type { IcsEvent } from "@/types";
import { readFile } from "node:fs/promises";
import { icsTestData } from "../utils";
import { z } from "zod";

it("Test Ics Event Parse", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART:19970903T163000Z",
    "DTEND:19970903T190000Z",
    "RECURRENCE-ID:19970903T163000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VEVENT",
  ]);
  expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});

it("Test Ics Event Parse", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:19970901T130000Z-123402@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART:19970401T163000Z",
    "DTEND:19970402T010000Z",
    "SUMMARY:Laurel is in sensitivity awareness class.",
    "CLASS:PUBLIC",
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
  ]);
  expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});

it("Test Ics Event Parse", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:19970901T130000Z-123403@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART;VALUE=DATE:19971102",
    "DURATION:P1D",
    "SUMMARY:Our Blissful Anniversary",
    "TRANSP:TRANSPARENT",
    "CLASS:CONFIDENTIAL",
    "CATEGORIES:ANNIVERSARY,PERSONAL,SPECIAL OCCASION",
    "RRULE:FREQ=YEARLY",
    "END:VEVENT",
  ]);
  expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});

it("Test Ics Event Parse", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:20070423T123432Z-541111@example.com",
    "DTSTAMP:20070423T123432Z",
    "DTSTART;VALUE=DATE:20070628",
    "DTEND;VALUE=DATE:20070709",
    "SUMMARY:Festival International de Jazz de Montreal",
    "TRANSP:TRANSPARENT",
    "END:VEVENT",
  ]);

  expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});

it("Test Ics Event Parse - recurrenceId gh#140", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:20070423T123432Z-541111@example.com",
    "DTSTAMP:20070423T123432Z",
    "DTSTART;VALUE=DATE:20070628",
    "DTEND;VALUE=DATE:20070709",
    "SUMMARY:Festival International de Jazz de Montreal",
    "RECURRENCE-ID:19970903T163000Z",
    "END:VEVENT",
  ]);

  expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});

it("Test ICS Event With Long Description Parse", async () => {
  const buffer = await readFile(
    `${__dirname}/fixtures/longDescriptionEvent.ics`,
    "utf8"
  );
  const event = buffer.toString();

  expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});

it("Expect 'formatLines' to handle multiple line breaks correctly", async () => {
  const event: IcsEvent = {
    start: { date: new Date("2024-08-23T22:00:00Z") },
    stamp: { date: new Date("2024-08-23T22:00:00Z") },
    summary: "Holiday",
    uid: "123",
    description:
      "Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
    end: { date: new Date("2024-09-06T21:00:00Z") },
  };

  const generatedEvent = generateIcsEvent(event);

  expect(() => convertIcsEvent(undefined, generatedEvent)).not.toThrow();

  const parsed = convertIcsEvent(undefined, generatedEvent);

  expect(parsed.description).toEqual(event.description);
});

it("Test non standard value", async () => {
  const nonStandardValue = "yeah";

  const eventString = icsTestData([
    "BEGIN:VEVENT",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART:19970903T163000Z",
    "DTEND:19970903T190000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    `X-WTF:${nonStandardValue}`,
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VEVENT",
  ]);

  const event = convertIcsEvent(undefined, eventString, {
    nonStandard: {
      wtf: {
        name: "X-WTF",
        convert: (line) => line.value,
        schema: z.string(),
      },
    },
  });

  expect(event.nonStandard?.wtf).toBe(nonStandardValue);
});

it("Event Description AltRep support #197", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART:19970903T163000Z",
    "DTEND:19970903T190000Z",
    "SUMMARY:Annual Employee Review",
    `DESCRIPTION;ALTREP="data:text/html,%3Cb%3Erich%20%3Ci%3Etext%3C%2Fi%3E%3C%2Fb%3E":rich text`,
    "END:VEVENT",
  ]);
  expect(convertIcsEvent(undefined, event).descriptionAltRep).toBe(
    "data:text/html,%3Cb%3Erich%20%3Ci%3Etext%3C%2Fi%3E%3C%2Fb%3E"
  );
});
