import { COMMA } from "@/constants";

import { parseIcsWeekdayNumber } from "@/lib/parse/weekdayNumber";

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `MO,TU,WE,TH,FR,SA,SU`;

  expect(() =>
    weekdayNumber.split(COMMA).forEach((w) => parseIcsWeekdayNumber(w))
  ).not.toThrow();
});

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `1SU`;

  expect(() => parseIcsWeekdayNumber(weekdayNumber)).not.toThrow();
});

it("Test Ics Weekday Number Parse", async () => {
  const weekdayNumber = `-1MO`;

  expect(() => parseIcsWeekdayNumber(weekdayNumber)).not.toThrow();
});
