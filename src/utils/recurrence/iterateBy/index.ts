import { compareAsc, isWithinInterval } from "date-fns";

import { RecurrenceRule } from "@/types";

import type { ExtendByRecurrenceRuleOptions } from "..";
import { iterateByDay } from "./day";
import { iterateByHour } from "./hour";
import { iterateByMinute } from "./minute";
import { iterateByMonth } from "./month";
import { iterateByMonthDay } from "./monthDay";
import { iterateBySecond } from "./second";
import { iterateBySetPos } from "./setPos";
import { iterateByWeekNo } from "./weekNo";
import { iterateByYearDay } from "./yearDay";

export const iterateBy = (
  rule: RecurrenceRule,
  options: Required<ExtendByRecurrenceRuleOptions>,
  dateGroups: Date[][]
): Date[][] => {
  let extendedDateGroups = dateGroups;

  if (rule.byMonth) {
    extendedDateGroups = iterateByMonth(rule, extendedDateGroups, rule.byMonth);
  }

  if (rule.byWeekNo) {
    extendedDateGroups = iterateByWeekNo(
      rule,
      extendedDateGroups,
      rule.byWeekNo
    );
  }

  if (rule.byYearday) {
    extendedDateGroups = iterateByYearDay(
      rule,
      extendedDateGroups,
      rule.byYearday
    );
  }

  if (rule.byMonthday) {
    extendedDateGroups = iterateByMonthDay(
      rule,
      extendedDateGroups,
      rule.byMonthday
    );
  }

  if (rule.byDay) {
    extendedDateGroups = iterateByDay(rule, extendedDateGroups, rule.byDay);
  }

  if (rule.byHour) {
    extendedDateGroups = iterateByHour(rule, extendedDateGroups, rule.byHour);
  }

  if (rule.byMinute) {
    extendedDateGroups = iterateByMinute(
      rule,
      extendedDateGroups,
      rule.byMinute
    );
  }

  if (rule.bySecond) {
    extendedDateGroups = iterateBySecond(
      rule,
      extendedDateGroups,
      rule.bySecond
    );
  }

  if (rule.bySetPos) {
    extendedDateGroups = iterateBySetPos(
      rule,
      extendedDateGroups,
      rule.bySetPos
    );
  }

  const filtered = extendedDateGroups.map((dates) =>
    dates
      .sort(compareAsc)
      .filter((date) =>
        isWithinInterval(date, { start: options.start, end: options.end })
      )
  );

  return filtered;
};
