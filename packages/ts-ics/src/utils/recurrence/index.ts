import { addYears } from "date-fns";

import type { IcsRecurrenceRule, WeekDayNumber } from "@/types";
import { weekDays } from "@/types";

import { iterateBase } from "./iterate";
import { iterateBy } from "./iterateBy";

export type ExtendByRecurrenceRuleOptions = {
  start: Date;
  end?: Date;
  exceptions?: Date[];
};

export const DEFAULT_END_IN_YEARS = 2;

export const extendByRecurrenceRule = (
  rule: IcsRecurrenceRule,
  options: ExtendByRecurrenceRuleOptions
): Date[] => {
  const start: Date = options.start;

  const end: Date =
    rule.until?.date || options?.end || addYears(start, DEFAULT_END_IN_YEARS);

  const exceptions: Date[] = options.exceptions || [];

  const weekStartsOn = ((rule.workweekStart
    ? weekDays.indexOf(rule.workweekStart)
    : 1) % 7) as WeekDayNumber;

  const dateGroups: Date[][] = [[start]];

  iterateBase(rule, { start, end }, dateGroups);

  const finalDateGroups = iterateBy(
    rule,
    { start, end, exceptions, weekStartsOn },
    dateGroups
  );

  const finalDates = rule.count
    ? finalDateGroups.flat().splice(0, rule.count)
    : finalDateGroups.flat();

  return finalDates;
};
