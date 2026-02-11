import { generateIcsRecurrenceRule, convertIcsRecurrenceRule } from "@/lib";
import { getLine } from "@/lib/parse/utils/line";
import type { IcsRecurrenceRule } from "@/types";

it("IcsRecurrenceRule UNTIL is generated correctly - DATE-TIME", async () => {
  const rule: IcsRecurrenceRule = {
    frequency: "WEEKLY",
    until: { date: new Date(2024, 10, 3), type: "DATE-TIME" },
  };

  const ruleString = generateIcsRecurrenceRule(rule);

  const parsed = convertIcsRecurrenceRule(undefined, getLine(ruleString).line);

  expect(rule).toEqual(parsed);
});

it("IcsRecurrenceRule UNTIL is not 'undefined' when left empty", async () => {
  const rule: IcsRecurrenceRule = {
    frequency: "WEEKLY",
    until: { date: new Date(2024, 10, 3) },
  };

  const ruleString = generateIcsRecurrenceRule(rule);

  expect(ruleString).not.toContain("undefined");
});

// it("IcsRecurrenceRule UNTIL is generated correctly - with local", async () => { // Dont works because cant find example of how UNTIL with Timezone string is created
//   const date = new Date(2023, 6, 2, 14, 30);

//   const rule: IcsRecurrenceRule = {
//     frequency: "WEEKLY",
//     until: {
//       date,
//       type: "DATE-TIME",
//       local: {
//         date: addMilliseconds(
//           date,
//           getOffsetFromTimezoneId("America/New_York", date)
//         ),
//         timezone: "America/New_York",
//         tzoffset: "-0400",
//       },
//     },
//   };

//   const ruleString = generateIcsRecurrenceRule(rule);

//   const parsed = convertIcsRecurrenceRule(getLine(ruleString).value);

//   expect(rule).toEqual(parsed);
// });

// https://icalendar.org/iCalendar-RFC-5545/3-3-10-recurrence-rule.html
// Compliant applications MUST accept rule parts ordered in any sequence, but to ensure backward
// compatibility with applications that pre-date this revision of iCalendar the FREQ rule part
// MUST be the first rule part specified in a RECUR value.
it("IcsRecurrenceRule - FREQ rule part MUST be the first rule part to ensure backward and apple compatibility - GH#237", async () => {
  const rule: IcsRecurrenceRule = {
    until: { date: new Date(2024, 10, 3) },
    byDay: [{ day: "MO" }],
    byHour: [1],
    byMinute: [1],
    byMonth: [1],
    byMonthday: [1],
    bySecond: [1],
    bySetPos: [1],
    byWeekNo: [1],
    byYearday: [1],
    count: 1,
    interval: 1,
    workweekStart: "MO",
    frequency: "WEEKLY",
  };

  const ruleString = generateIcsRecurrenceRule(rule);

  console.log(ruleString);
  expect(ruleString.startsWith("RRULE:FREQ=WEEKLY;")).toBe(true);
});
