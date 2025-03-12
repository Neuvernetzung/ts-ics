import {
  addDays,
  addHours,
  addMinutes,
  addMonths,
  addSeconds,
  addWeeks,
  addYears,
} from "date-fns";

import type { ExtendByRecurrenceRuleOptions } from ".";
import type { IcsRecurrenceRule } from "@/types";

const limitReached = (length: number, limit?: number) => {
  if (limit === undefined) return false;
  return length >= limit;
};

export const iterateBase = (
  rule: IcsRecurrenceRule,
  { start, end }: Required<Omit<ExtendByRecurrenceRuleOptions, "exceptions">>,
  dateGroups: Date[][]
) => {
  if (limitReached(dateGroups.length, rule.count)) return;

  const frequency = rule.frequency;
  const interval = rule.interval || 1;

  if (!frequency) return;

  let date = start;

  if (frequency === "SECONDLY") {
    while (date < end) {
      if (limitReached(dateGroups.length, rule.count)) return;
      date = addSeconds(date, interval);
      dateGroups.push([date]);
    }
    return;
  }

  if (frequency === "MINUTELY") {
    while (date < end) {
      if (limitReached(dateGroups.length, rule.count)) return;
      date = addMinutes(date, interval);
      dateGroups.push([date]);
    }
    return;
  }

  if (frequency === "HOURLY") {
    while (date < end) {
      if (limitReached(dateGroups.length, rule.count)) return;
      date = addHours(date, interval);
      dateGroups.push([date]);
    }
    return;
  }

  if (frequency === "DAILY") {
    while (date < end) {
      if (limitReached(dateGroups.length, rule.count)) return;
      date = addDays(date, interval);
      dateGroups.push([date]);
    }
    return;
  }

  if (frequency === "WEEKLY") {
    while (date < end) {
      if (limitReached(dateGroups.length, rule.count)) return;
      date = addWeeks(date, interval);
      dateGroups.push([date]);
    }
    return;
  }

  if (frequency === "MONTHLY") {
    while (date < end) {
      date = addMonths(date, interval);
      dateGroups.push([date]);
    }
    return;
  }

  if (frequency === "YEARLY") {
    while (date < end) {
      date = addYears(date, interval);
      dateGroups.push([date]);
    }
    // eslint-disable-next-line no-useless-return
    return;
  }
};
