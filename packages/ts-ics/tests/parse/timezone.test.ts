import * as z from "zod";
import { convertIcsEvent } from "@/lib";
import { convertIcsTimezone } from "@/lib/parse/components/timezone";
import { icsTestData } from "../utils";

it("Test Ics Timezone Parse", async () => {
	const timezone = icsTestData([
		"BEGIN:VTIMEZONE",
		"TZID:America/New_York",
		"LAST-MODIFIED:20050809T050000Z",
		"BEGIN:DAYLIGHT",
		"DTSTART:19670430T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=-1SU;UNTIL=19730429T070000Z",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:19671029T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU;UNTIL=20061029T060000Z",
		"TZOFFSETFROM:-0400",
		"TZOFFSETTO:-0500",
		"TZNAME:EST",
		"END:STANDARD",
		"BEGIN:DAYLIGHT",
		"DTSTART:19740106T020000",
		"RDATE:19750223T020000",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"BEGIN:DAYLIGHT",
		"DTSTART:19760425T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=-1SU;UNTIL=19860427T070000Z",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"BEGIN:DAYLIGHT",
		"DTSTART:19870405T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU;UNTIL=20060402T070000Z",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"BEGIN:DAYLIGHT",
		"DTSTART:20070311T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:20071104T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
		"TZOFFSETFROM:-0400",
		"TZOFFSETTO:-0500",
		"TZNAME:EST",
		"END:STANDARD",
		"END:VTIMEZONE",
	]);

	expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
	const timezone = icsTestData([
		"BEGIN:VTIMEZONE",
		"TZID:America/New_York",
		"LAST-MODIFIED:20050809T050000Z",
		"BEGIN:STANDARD",
		"DTSTART:20071104T020000",
		"TZOFFSETFROM:-0400",
		"TZOFFSETTO:-0500",
		"TZNAME:EST",
		"END:STANDARD",
		"BEGIN:DAYLIGHT",
		"DTSTART:20070311T020000",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"END:VTIMEZONE",
	]);
	expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
	const timezone = icsTestData([
		"BEGIN:VTIMEZONE",
		"TZID:America/New_York",
		"LAST-MODIFIED:20050809T050000Z",
		"TZURL:http://zones.example.com/tz/America-New_York.ics",
		"BEGIN:STANDARD",
		"DTSTART:20071104T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
		"TZOFFSETFROM:-0400",
		"TZOFFSETTO:-0500",
		"TZNAME:EST",
		"END:STANDARD",
		"BEGIN:DAYLIGHT",
		"DTSTART:20070311T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"END:VTIMEZONE",
	]);
	expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
	const timezone = icsTestData([
		"BEGIN:VTIMEZONE",
		"TZID:Fictitious",
		"LAST-MODIFIED:19870101T000000Z",
		"BEGIN:STANDARD",
		"DTSTART:19671029T020000",
		"RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
		"TZOFFSETFROM:-0400",
		"TZOFFSETTO:-0500",
		"TZNAME:EST",
		"END:STANDARD",
		"BEGIN:DAYLIGHT",
		"DTSTART:19870405T020000",
		"RRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=4;UNTIL=19980404T070000Z",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"END:VTIMEZONE",
	]);
	expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics Timezone Parse", async () => {
	const timezone = icsTestData([
		"BEGIN:VTIMEZONE",
		"TZID:Fictitious",
		"LAST-MODIFIED:19870101T000000Z",
		"BEGIN:STANDARD",
		"DTSTART:19671029T020000",
		"RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10",
		"TZOFFSETFROM:-0400",
		"TZOFFSETTO:-0500",
		"TZNAME:EST",
		"END:STANDARD",
		"BEGIN:DAYLIGHT",
		"DTSTART:19870405T020000",
		"RRULE:FREQ=YEARLY;BYDAY=1SU;BYMONTH=4;UNTIL=19980404T070000Z",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"BEGIN:DAYLIGHT",
		"DTSTART:19990424T020000",
		"RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=4",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"END:VTIMEZONE",
	]);
	expect(() => convertIcsTimezone(undefined, timezone)).not.toThrow();
});

it("Test Ics custom not provided Timezone", async () => {
	// https://github.com/Neuvernetzung/ts-ics/issues/104
	const event = icsTestData([
		"BEGIN:VEVENT",
		"UID:20241210T100000-541111@example.com",
		"DTSTAMP:20241210T100000",
		"DTSTART;TZID=Customized Time Zone:20241210T100000",
		"DTEND;TZID=Customized Time Zone:20241210T110000",
		"SUMMARY:Festival International de Jazz de Montreal",
		"TRANSP:TRANSPARENT",
		"END:VEVENT",
	]);
	expect(() => convertIcsEvent(undefined, event)).not.toThrow();
});

it("Test non standard value", async () => {
	const nonStandardValue = "yeah";

	const timeZoneString = icsTestData([
		"BEGIN:VTIMEZONE",
		"TZID:America/New_York",
		"LAST-MODIFIED:20050809T050000Z",
		`X-WTF:${nonStandardValue}`,
		"BEGIN:STANDARD",
		"DTSTART:20071104T020000",
		"TZOFFSETFROM:-0400",
		"TZOFFSETTO:-0500",
		"TZNAME:EST",
		"END:STANDARD",
		"BEGIN:DAYLIGHT",
		"DTSTART:20070311T020000",
		"TZOFFSETFROM:-0500",
		"TZOFFSETTO:-0400",
		"TZNAME:EDT",
		"END:DAYLIGHT",
		"END:VTIMEZONE",
	]);

	const timeZone = convertIcsTimezone(undefined, timeZoneString, {
		nonStandard: {
			wtf: {
				name: "X-WTF",
				convert: (line) => line.value,
				schema: z.string(),
			},
		},
	});

	expect(timeZone.nonStandard?.wtf).toBe(nonStandardValue);
});

it('should resolve correct offset (+0900) when VTIMEZONE contains historical DST observances (regression for #246)', async () => {
  const icsString = icsTestData([
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    'DTSTART;TZID=Asia/Tokyo:20260527T125500',
    'DTEND;TZID=Asia/Tokyo:20260527T160500',
    'UID:test-jst-regression',
    'END:VEVENT',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Tokyo',
    'BEGIN:STANDARD',
    'DTSTART:18880101T001859',
    'RDATE:18880101T001859',
    'TZNAME:JST',
    'TZOFFSETFROM:+091859',
    'TZOFFSETTO:+0900',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19480501T235959',
    'RDATE:19480501T235959',
    'RDATE:19490402T235959',
    'TZNAME:JDT',
    'TZOFFSETFROM:+0900',
    'TZOFFSETTO:+1000',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'DTSTART:19480912T010000',
    'RRULE:FREQ=YEARLY;UNTIL=19510908T150000Z;BYMONTH=9;BYMONTHDAY=9,10,11,12,13,14,15;BYDAY=SU',
    'TZNAME:JST',
    'TZOFFSETFROM:+1000',
    'TZOFFSETTO:+0900',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19500506T235959',
    'RRULE:FREQ=YEARLY;UNTIL=19510505T145959Z;BYMONTH=5;BYDAY=1SA',
    'TZNAME:JDT',
    'TZOFFSETFROM:+0900',
    'TZOFFSETTO:+1000',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
    'END:VCALENDAR',
  ]);

  const { convertIcsCalendar } = await import('@/lib');
  const cal = convertIcsCalendar(undefined, icsString);

  // Regression: historical JDT (+1000) should NOT apply to 2026 dates
  expect(cal.events).toHaveLength(1);
  expect(cal.events[0].start.date.toISOString()).toBe('2026-05-27T03:55:00.000Z');
  expect(cal.events[0].end.date.toISOString()).toBe('2026-05-27T07:05:00.000Z');
  expect(cal.events[0].start.local).toEqual({
    date: expect.any(Date),
    timezone: 'Asia/Tokyo',
    tzoffset: '+0900',
  });
});
