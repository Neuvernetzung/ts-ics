import { getMinutes, setMinutes } from "date-fns";

import type { IcsRecurrenceRule } from "@/types";

export const iterateByMinute = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  byMinute: NonNullable<IcsRecurrenceRule["byMinute"]>
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
