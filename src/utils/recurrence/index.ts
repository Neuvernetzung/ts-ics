import { addYears } from "date-fns";

import { RecurrenceRule } from "@/types";

import { iterateBase } from "./iterate";
import { iterateBy } from "./iterateBy";

export type ExtendByRecurrenceRuleOptions = { start: Date; end?: Date };

export const DEFAULT_END_IN_YEARS = 2;

export const extendByRecurrenceRule = (
  rule: RecurrenceRule,
  options: ExtendByRecurrenceRuleOptions
): Date[] => {
  const start: Date = options.start;

  const end: Date =
    rule.until?.date || options?.end || addYears(start, DEFAULT_END_IN_YEARS);

  const dateGroups: Date[][] = [[start]];

  iterateBase(rule, { start, end }, dateGroups);

  const finalDateGroups = iterateBy(rule, { start, end }, dateGroups);

  const finalDates = rule.count
    ? finalDateGroups.flat().splice(0, rule.count)
    : finalDateGroups.flat();

  return finalDates;
};
