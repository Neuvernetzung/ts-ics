import { generateIcsRecurrenceRule, icsRecurrenceRuleToObject } from "@/lib";
import { getLine } from "@/lib/parse/utils/line";
import type { RecurrenceRule } from "@/types";

it("RecurrenceRule UNTIL is generated correctly - DATE-TIME", async () => {
  const rule: RecurrenceRule = {
    frequency: "WEEKLY",
    until: { date: new Date(2024, 10, 3), type: "DATE-TIME" },
  };

  const ruleString = generateIcsRecurrenceRule(rule);

  const parsed = icsRecurrenceRuleToObject(getLine(ruleString).value);

  expect(rule).toEqual(parsed);
});

it("RecurrenceRule UNTIL is not 'undefined' when left empty", async () => {
  const rule: RecurrenceRule = {
    frequency: "WEEKLY",
    until: { date: new Date(2024, 10, 3) },
  };

  const ruleString = generateIcsRecurrenceRule(rule);

  expect(ruleString).not.toContain("undefined");
});

// it("RecurrenceRule UNTIL is generated correctly - with local", async () => { // Dont works because cant find example of how UNTIL with Timezone string is created
//   const date = new Date(2023, 6, 2, 14, 30);

//   const rule: RecurrenceRule = {
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

//   const parsed = icsRecurrenceRuleToObject(getLine(ruleString).value);

//   expect(rule).toEqual(parsed);
// });
