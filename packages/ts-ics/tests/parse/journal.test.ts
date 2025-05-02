import { generateIcsJournal } from "@/lib";
import { convertIcsJournal } from "@/lib/parse/journal";
import type { IcsJournal } from "@/types";
import { icsTestData } from "../utils";
import { z } from "zod";

it("Test Ics Journal Parse", async () => {
  const journal = icsTestData([
    "BEGIN:VJOURNAL",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DUE:19970903T190000Z",
    "RECURRENCE-ID:19970903T163000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VJOURNAL",
  ]);
  expect(() => convertIcsJournal(undefined, journal)).not.toThrow();
});

it("Test Ics Journal Parse", async () => {
  const journal = icsTestData([
    "BEGIN:VJOURNAL",
    "UID:19970901T130000Z-123402@example.com",
    "DTSTAMP:19970901T130000Z",
    "DUE:19970402T010000Z",
    "SUMMARY:Laurel is in sensitivity awareness class.",
    "CLASS:PUBLIC",
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VJOURNAL",
  ]);
  expect(() => convertIcsJournal(undefined, journal)).not.toThrow();
});

it("Test Ics Journal Parse", async () => {
  const journal = icsTestData([
    "BEGIN:VJOURNAL",
    "UID:19970901T130000Z-123403@example.com",
    "DTSTAMP:19970901T130000Z",
    "DTSTART;VALUE=DATE:19971102",
    "DURATION:P1D",
    "SUMMARY:Our Blissful Anniversary",
    "CLASS:CONFIDENTIAL",
    "CATEGORIES:ANNIVERSARY,PERSONAL,SPECIAL OCCASION",
    "RRULE:FREQ=YEARLY",
    "END:VJOURNAL",
  ]);
  expect(() => convertIcsJournal(undefined, journal)).not.toThrow();
});

it("Test Ics Journal Parse", async () => {
  const journal = icsTestData([
    "BEGIN:VJOURNAL",
    "UID:20070423T123432Z-541111@example.com",
    "DTSTAMP:20070423T123432Z",
    "DUE;VALUE=DATE:20070709",
    "SUMMARY:Festival International de Jazz de Montreal",
    "END:VJOURNAL",
  ]);

  expect(() => convertIcsJournal(undefined, journal)).not.toThrow();
});

it("Test Ics Journal Parse - recurrenceId gh#140", async () => {
  const journal = icsTestData([
    "BEGIN:VJOURNAL",
    "UID:20070423T123432Z-541111@example.com",
    "DTSTAMP:20070423T123432Z",
    "DUE;VALUE=DATE:20070709",
    "SUMMARY:Festival International de Jazz de Montreal",
    "RECURRENCE-ID:19970903T163000Z",
    "END:VJOURNAL",
  ]);

  expect(() => convertIcsJournal(undefined, journal)).not.toThrow();
});

it("Expect 'formatLines' to handle multiple line breaks correctly", async () => {
  const journal: IcsJournal = {
    stamp: { date: new Date("2024-08-23T22:00:00Z") },
    summary: "Holiday",
    uid: "123",
    description:
      "Dear Mr. Admin,\n\nWe would like to use the appointment to discuss the information regarding the administration of travel documents for the trip to Norway for [Travel Company].\n\n\n\nBest regards,\n\nTest User",
  };

  const generatedJournal = generateIcsJournal(journal);

  expect(() => convertIcsJournal(undefined, generatedJournal)).not.toThrow();

  const parsed = convertIcsJournal(undefined, generatedJournal);

  expect(parsed.description).toEqual(journal.description);
});

it("Test non standard value", async () => {
  const nonStandardValue = "yeah";

  const journalString = icsTestData([
    "BEGIN:VJOURNAL",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DUE:19970903T190000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    `X-WTF:${nonStandardValue}`,
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VJOURNAL",
  ]);

  const journal = convertIcsJournal(undefined, journalString, {
    nonStandard: {
      wtf: {
        name: "X-WTF",
        convert: (line) => line.value,
        schema: z.string(),
      },
    },
  });

  expect(journal.nonStandard?.wtf).toBe(nonStandardValue);
});
