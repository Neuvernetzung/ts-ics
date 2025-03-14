import { COMMA } from "@/constants";

import { convertIcsWeekDayNumber } from "@/lib/parse/weekDayNumber";

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `MO,TU,WE,TH,FR,SA,SU`;

  expect(() =>
    weekdayNumber
      .split(COMMA)
      .forEach((w) => convertIcsWeekDayNumber(undefined, { value: w }))
  ).not.toThrow();
});

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `1SU`;

  expect(() =>
    convertIcsWeekDayNumber(undefined, { value: weekdayNumber })
  ).not.toThrow();
});

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `-1MO`;

  expect(() =>
    convertIcsWeekDayNumber(undefined, { value: weekdayNumber })
  ).not.toThrow();
});
