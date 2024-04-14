import { getMinutes, setMinutes } from "date-fns";

import type { RecurrenceRule } from "@/types";

export const iterateByMinute = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byMinute: NonNullable<RecurrenceRule["byMinute"]>
): Date[][] => {
  if (
    rule.frequency === "YEARLY" ||
    rule.frequency === "MONTHLY" ||
    rule.frequency === "WEEKLY" ||
    rule.frequency === "DAILY" ||
    rule.frequency === "HOURLY"
  ) {
    return dateGroups.map((dates) =>
      dates.flatMap((date) => byMinute.map((hour) => setMinutes(date, hour)))
    );
  }

  return dateGroups.map((dates) =>
    dates.filter((date) => byMinute.includes(getMinutes(date)))
  );
};
