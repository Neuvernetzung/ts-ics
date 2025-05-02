import { convertIcsFreeBusy } from "@/lib/parse/freebusy";
import { icsTestData } from "../utils";
import { z } from "zod";

it("Test Ics FreeBusy Parse", async () => {
  const freeBusy = icsTestData([
    "BEGIN:VFREEBUSY",
    "UID:19970901T082949Z-FA43EF@example.com",
    "ORGANIZER:mailto:jane_doe@example.com",
    "ATTENDEE:mailto:john_public@example.com",
    "DTSTART:19971015T050000Z",
    "DTEND:19971016T050000Z",
    "DTSTAMP:19970901T083000Z",
    "END:VFREEBUSY",
  ]);
  expect(() => convertIcsFreeBusy(undefined, freeBusy)).not.toThrow();
});

it("Test Ics FreeBusy Parse", async () => {
  const freeBusyString = icsTestData([
    "BEGIN:VFREEBUSY",
    "UID:19970901T095957Z-76A912@example.com",
    "ORGANIZER:mailto:jane_doe@example.com",
    "ATTENDEE:mailto:john_public@example.com",
    "DTSTAMP:19970901T100000Z",
    "FREEBUSY:19971015T050000Z/PT8H30M,",
    " 19971015T160000Z/PT5H30M,19971015T223000Z/PT6H30M",
    "URL:http://example.com/pub/busy/jpublic-01.ifb",
    "COMMENT:This iCalendar file contains busy time information for",
    "  the next three months.",
    "END:VFREEBUSY",
  ]);

  const freeBusy = convertIcsFreeBusy(undefined, freeBusyString);

  expect(freeBusy.freeBusy?.[0].values[0].start.toISOString()).toBe(
    new Date("1997-10-15T05:00:00Z").toISOString()
  );
  expect(freeBusy.freeBusy?.[0].values[0].duration).toStrictEqual({
    hours: 8,
    minutes: 30,
  });
  expect(freeBusy.freeBusy?.[0].values.length).toBe(3);
});

it("Test Ics FreeBusy Parse", async () => {
  const freeBusyString = icsTestData([
    "BEGIN:VFREEBUSY",
    "UID:19970901T115957Z-76A912@example.com",
    "DTSTAMP:19970901T120000Z",
    "ORGANIZER:jsmith@example.com",
    "DTSTART:19980313T141711Z",
    "DTEND:19980410T141711Z",
    "FREEBUSY:19980314T233000Z/19980315T003000Z",
    "FREEBUSY:19980316T153000Z/19980316T163000Z",
    "FREEBUSY:19980318T030000Z/19980318T040000Z",
    "URL:http://www.example.com/calendar/busytime/jsmith.ifb",
    "END:VFREEBUSY",
  ]);

  const freeBusy = convertIcsFreeBusy(undefined, freeBusyString);

  expect(freeBusy.freeBusy?.[0].values[0].start.toISOString()).toBe(
    new Date("1998-03-14T23:30:00Z").toISOString()
  );
  expect(freeBusy.freeBusy?.[0].values[0].end?.toISOString()).toBe(
    new Date("1998-03-15T00:30:00Z").toISOString()
  );
  expect(freeBusy.freeBusy?.length).toBe(3);
});

it("Test non standard value", async () => {
  const nonStandardValue = "yeah";

  const freeBusyString = icsTestData([
    "BEGIN:VFREEBUSY",
    "UID:19970901T130000Z-123401@example.com",
    "DTSTAMP:19970901T130000Z",
    "DUE:19970903T190000Z",
    "SUMMARY:Annual Employee Review",
    "CLASS:PRIVATE",
    `X-WTF:${nonStandardValue}`,
    "CATEGORIES:BUSINESS,HUMAN RESOURCES",
    "END:VFREEBUSY",
  ]);

  const freeBusy = convertIcsFreeBusy(undefined, freeBusyString, {
    nonStandard: {
      wtf: {
        name: "X-WTF",
        convert: (line) => line.value,
        schema: z.string(),
      },
    },
  });

  expect(freeBusy.nonStandard?.wtf).toBe(nonStandardValue);
});
