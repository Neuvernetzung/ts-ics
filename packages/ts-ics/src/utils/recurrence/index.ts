import { addYears, isEqual } from "date-fns";

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

  const occurrences: Date[] = [];

  // Periode für Periode erweitern und filtern, damit COUNT erst nach den BY*-Regeln greift.
  for (const date of iterateBase(rule, { start, end })) {
    const [dates] = iterateBy(rule, { start, end, weekStartsOn }, [[date]]);
    occurrences.push(...dates);

    if (rule.count && occurrences.length >= rule.count) break;
  }

  const counted = rule.count ? occurrences.slice(0, rule.count) : occurrences;

  // EXDATE wird nach COUNT angewendet und verbraucht damit Vorkommen (RFC 5545 3.8.5.1).
  return counted.filter(
    (date) => !exceptions.some((exception) => isEqual(exception, date))
  );
};
