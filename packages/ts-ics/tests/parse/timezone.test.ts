import * as z from "zod";
import { convertIcsCalendar, convertIcsEvent } from "@/lib";
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

it("should return undefined offset for completely unknown timezone", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"DTSTART;TZID=Unknown/Nowhere:20260615T120000",
		"DTEND;TZID=Unknown/Nowhere:20260615T130000",
		"UID:test-unknown-tz",
		"END:VEVENT",
		"END:VCALENDAR",
	]);

	expect(() => convertIcsCalendar(undefined, icsString)).not.toThrow();
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

it("should resolve correct CEST offset (+0200) for a summer date in Berlin", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"DTSTART;TZID=Europe/Berlin:20260615T120000",
		"DTEND;TZID=Europe/Berlin:20260615T130000",
		"UID:test-cest",
		"END:VEVENT",
		"BEGIN:VTIMEZONE",
		"TZID:Europe/Berlin",
		"BEGIN:DAYLIGHT",
		"DTSTART:19810329T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
		"TZOFFSETFROM:+0100",
		"TZOFFSETTO:+0200",
		"TZNAME:CEST",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:19961027T030000",
		"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
		"TZOFFSETFROM:+0200",
		"TZOFFSETTO:+0100",
		"TZNAME:CET",
		"END:STANDARD",
		"END:VTIMEZONE",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	expect(cal.events?.[0].start.date.toISOString()).toBe(
		"2026-06-15T10:00:00.000Z",
	);
	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Europe/Berlin",
		tzoffset: "+0200",
	});
});

it("should resolve correct CET offset (+0100) for a winter date in Berlin", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"DTSTART;TZID=Europe/Berlin:20260115T120000",
		"DTEND;TZID=Europe/Berlin:20260115T130000",
		"UID:test-cet",
		"END:VEVENT",
		"BEGIN:VTIMEZONE",
		"TZID:Europe/Berlin",
		"BEGIN:DAYLIGHT",
		"DTSTART:19810329T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
		"TZOFFSETFROM:+0100",
		"TZOFFSETTO:+0200",
		"TZNAME:CEST",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:19961027T030000",
		"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
		"TZOFFSETFROM:+0200",
		"TZOFFSETTO:+0100",
		"TZNAME:CET",
		"END:STANDARD",
		"END:VTIMEZONE",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	expect(cal.events?.[0].start.date.toISOString()).toBe(
		"2026-01-15T11:00:00.000Z",
	);
	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Europe/Berlin",
		tzoffset: "+0100",
	});
});

it("should resolve correct offset for a historical date covered by an expired RRULE", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"DTSTART;TZID=Europe/Berlin:19900615T120000",
		"DTEND;TZID=Europe/Berlin:19900615T130000",
		"UID:test-historical-cest",
		"END:VEVENT",
		"BEGIN:VTIMEZONE",
		"TZID:Europe/Berlin",
		"BEGIN:DAYLIGHT",
		"DTSTART:19810329T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU;UNTIL=19950326T010000Z",
		"TZOFFSETFROM:+0100",
		"TZOFFSETTO:+0200",
		"TZNAME:CEST",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:19811025T030000",
		"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU;UNTIL=19951022T010000Z",
		"TZOFFSETFROM:+0200",
		"TZOFFSETTO:+0100",
		"TZNAME:CET",
		"END:STANDARD",
		"END:VTIMEZONE",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	expect(cal.events?.[0].start.date.toISOString()).toBe(
		"1990-06-15T10:00:00.000Z",
	);
	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Europe/Berlin",
		tzoffset: "+0200",
	});
});

it("should fall back to IANA offset when no VTIMEZONE is provided for Europe/Berlin", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"DTSTART;TZID=Europe/Berlin:20260615T120000",
		"DTEND;TZID=Europe/Berlin:20260615T130000",
		"UID:test-iana-fallback-berlin",
		"END:VEVENT",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	expect(cal.events?.[0].start.date.toISOString()).toBe(
		"2026-06-15T10:00:00.000Z",
	);
	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Europe/Berlin",
		tzoffset: "+0200",
	});
});

it("should resolve correct offset exactly at DST transition in Berlin", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		// 2026-03-29T03:00 Berlin = erster Moment nach dem Wechsel auf CEST
		"DTSTART;TZID=Europe/Berlin:20260329T030000",
		"DTEND;TZID=Europe/Berlin:20260329T040000",
		"UID:test-dst-boundary-berlin",
		"END:VEVENT",
		"BEGIN:VTIMEZONE",
		"TZID:Europe/Berlin",
		"BEGIN:DAYLIGHT",
		"DTSTART:19810329T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
		"TZOFFSETFROM:+0100",
		"TZOFFSETTO:+0200",
		"TZNAME:CEST",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:19961027T030000",
		"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
		"TZOFFSETFROM:+0200",
		"TZOFFSETTO:+0100",
		"TZNAME:CET",
		"END:STANDARD",
		"END:VTIMEZONE",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Europe/Berlin",
		tzoffset: "+0200",
	});
});

it("should resolve correct CET offset (+0100) exactly at end-of-DST transition in Berlin", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		// 2026-10-25T03:00 Berlin = erster Moment nach Rückwechsel auf CET
		"DTSTART;TZID=Europe/Berlin:20261025T030000",
		"DTEND;TZID=Europe/Berlin:20261025T040000",
		"UID:test-dst-end-boundary-berlin",
		"END:VEVENT",
		"BEGIN:VTIMEZONE",
		"TZID:Europe/Berlin",
		"BEGIN:DAYLIGHT",
		"DTSTART:19810329T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
		"TZOFFSETFROM:+0100",
		"TZOFFSETTO:+0200",
		"TZNAME:CEST",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:19961027T030000",
		"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
		"TZOFFSETFROM:+0200",
		"TZOFFSETTO:+0100",
		"TZNAME:CET",
		"END:STANDARD",
		"END:VTIMEZONE",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Europe/Berlin",
		tzoffset: "+0100",
	});
});

it("should resolve correct CET offset (+0100) for a date before first VTIMEZONE observance", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"DTSTART;TZID=Europe/Berlin:19700115T120000",
		"DTEND;TZID=Europe/Berlin:19700115T130000",
		"UID:test-before-vtimezone",
		"END:VEVENT",
		"BEGIN:VTIMEZONE",
		"TZID:Europe/Berlin",
		"BEGIN:DAYLIGHT",
		"DTSTART:19810329T020000",
		"RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
		"TZOFFSETFROM:+0100",
		"TZOFFSETTO:+0200",
		"TZNAME:CEST",
		"END:DAYLIGHT",
		"BEGIN:STANDARD",
		"DTSTART:19961027T030000",
		"RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
		"TZOFFSETFROM:+0200",
		"TZOFFSETTO:+0100",
		"TZNAME:CET",
		"END:STANDARD",
		"END:VTIMEZONE",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	// Kein RRULE greift → Fallback auf IANA
	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Europe/Berlin",
		tzoffset: "+0100",
	});
});

it("should resolve correct offset (+0900) when VTIMEZONE contains historical DST observances (regression for #246)", async () => {
	const icsString = icsTestData([
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		"DTSTART;TZID=Asia/Tokyo:20260527T125500",
		"DTEND;TZID=Asia/Tokyo:20260527T160500",
		"UID:test-jst-regression",
		"END:VEVENT",
		"BEGIN:VTIMEZONE",
		"TZID:Asia/Tokyo",

		"BEGIN:STANDARD",
		"DTSTART:18880101T001859",
		"RDATE:18880101T001859",
		"TZNAME:JST",
		"TZOFFSETFROM:+091859",
		"TZOFFSETTO:+0900",
		"END:STANDARD",

		"BEGIN:DAYLIGHT",
		"DTSTART:19480501T235959",
		"RDATE:19480501T235959",
		"RDATE:19490402T235959",
		"TZNAME:JDT",
		"TZOFFSETFROM:+0900",
		"TZOFFSETTO:+1000",
		"END:DAYLIGHT",

		"BEGIN:STANDARD",
		"DTSTART:19480912T010000",
		"RRULE:FREQ=YEARLY;UNTIL=19510909T235959Z;BYMONTH=9;BYDAY=2SU;",
		"TZNAME:JST",
		"TZOFFSETFROM:+1000",
		"TZOFFSETTO:+0900",
		"END:STANDARD",

		"BEGIN:DAYLIGHT",
		"DTSTART:19500506T235959",
		"RRULE:FREQ=YEARLY;UNTIL=19510505T235959Z;BYMONTH=5;BYDAY=1SA",
		"TZNAME:JDT",
		"TZOFFSETFROM:+0900",
		"TZOFFSETTO:+1000",
		"END:DAYLIGHT",

		"END:VTIMEZONE",
		"END:VCALENDAR",
	]);

	const cal = convertIcsCalendar(undefined, icsString);

	// Regression: historical JDT (+1000) should NOT apply to 2026 dates
	expect(cal.events).toHaveLength(1);
	expect(cal.events?.[0].start.date.toISOString()).toBe(
		"2026-05-27T03:55:00.000Z",
	);
	expect(cal.events?.[0].end?.date.toISOString()).toBe(
		"2026-05-27T07:05:00.000Z",
	);
	expect(cal.events?.[0].start.local).toEqual({
		date: expect.any(Date),
		timezone: "Asia/Tokyo",
		tzoffset: "+0900",
	});
});
