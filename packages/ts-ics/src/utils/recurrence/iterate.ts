import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
} from "date-fns";

import type { IcsRecurrenceRule, IcsRecurrenceRuleFrequency } from "@/types";

const addByFrequency: Record<
  IcsRecurrenceRuleFrequency,
  (date: Date, amount: number) => Date
> = {
  SECONDLY: addSeconds,
  MINUTELY: addMinutes,
  HOURLY: addHours,
  DAILY: addDays,
  WEEKLY: addWeeks,
  MONTHLY: addMonths,
  YEARLY: addYears,
};

// Liefert den Startzeitpunkt jeder Periode, beginnend mit `start`. Der erste Wert nach `end` wird noch geliefert, da seine Periode in den Zeitraum hineinreichen kann.
export function* iterateBase(
  rule: IcsRecurrenceRule,
  { start, end }: { start: Date; end: Date }
): Generator<Date> {
  let date = start;
  yield date;

  if (!rule.frequency) return;

  const add = addByFrequency[rule.frequency];
  const interval = rule.interval || 1;

  while (date < end) {
    date = add(date, interval);
    yield date;
  }
}
