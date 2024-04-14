import { getSeconds, setSeconds } from "date-fns";

import type { RecurrenceRule } from "@/types";

export const iterateBySecond = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  bySecond: NonNullable<RecurrenceRule["bySecond"]>
): Date[][] => {
  if (
    rule.frequency === "YEARLY" ||
    rule.frequency === "MONTHLY" ||
    rule.frequency === "WEEKLY" ||
    rule.frequency === "DAILY" ||
    rule.frequency === "HOURLY" ||
    rule.frequency === "MINUTELY"
  ) {
    return dateGroups.map((dates) =>
      dates.flatMap((date) => bySecond.map((hour) => setSeconds(date, hour)))
    );
  }

  return dateGroups.map((dates) =>
    dates.filter((date) => bySecond.includes(getSeconds(date)))
  );
};
