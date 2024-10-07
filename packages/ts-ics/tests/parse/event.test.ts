import { generateIcsEvent } from "@/lib";
import { parseIcsEvent } from "@/lib/parse/event";
import type { VEvent } from "@/types";
import { readFile } from "node:fs/promises";
import { icsTestData } from "../utils";

it("Test Ics Event Parse", async () => {
  const event = icsTestData([
    "BEGIN:VEVENT",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART:19970903T163000Z",
    "DTEND:19970903T190000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VEVENT",
  ]);
  expect(() => parseIcsEvent(event)).not.toThrow();
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
  expect(() => parseIcsEvent(event)).not.toThrow();
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
  expect(() => parseIcsEvent(event)).not.toThrow();
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
  expect(() => parseIcsEvent(event)).not.toThrow();
});

it("Test ICS Event With Long Description Parse", async () => {
  const buffer = await readFile(
    `${__dirname}/fixtures/longDescriptionEvent.ics`,
    "utf8"
  );
  const event = buffer.toString();

  expect(() => parseIcsEvent(event)).not.toThrow();
});

it("Expect 'formatLines' to handle multiple line breaks correctly", async () => {
  const event: VEvent = {
    start: { date: new Date("2024-08-23T22:00:00Z") },
    stamp: { date: new Date("2024-08-23T22:00:00Z") },
    summary: "Holiday",
    uid: "123",
    description:
      "Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
    end: { date: new Date("2024-09-06T21:00:00Z") },
  };

  const generatedEvent = generateIcsEvent(event);

  expect(() => parseIcsEvent(generatedEvent)).not.toThrow();

  const parsed = parseIcsEvent(generatedEvent);

  expect(parsed.description).toEqual(event.description);
});
