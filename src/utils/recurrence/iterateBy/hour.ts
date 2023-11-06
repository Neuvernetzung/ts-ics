import { getHours, setHours } from "date-fns";

import type { RecurrenceRule } from "@/types";

export const iterateByHour = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byHour: NonNullable<RecurrenceRule["byHour"]>
): Date[][] => {
  if (
    rule.frequency === "YEARLY" ||
    rule.frequency === "MONTHLY" ||
    rule.frequency === "WEEKLY" ||
    rule.frequency === "DAILY"
  ) {
    return dateGroups.map((dates) =>
      dates.map((date) => byHour.map((hour) => setHours(date, hour))).flat()
    );
  }

  return dateGroups.map((dates) =>
    dates.filter((date) => byHour.includes(getHours(date)))
  );
};
