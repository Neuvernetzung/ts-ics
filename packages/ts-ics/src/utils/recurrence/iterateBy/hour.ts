import { getHours, setHours } from "date-fns";

import type { IcsRecurrenceRule } from "@/types";

export const iterateByHour = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  byHour: NonNullable<IcsRecurrenceRule["byHour"]>
): Date[][] => {
  if (
    rule.frequency === "YEARLY" ||
    rule.frequency === "MONTHLY" ||
    rule.frequency === "WEEKLY" ||
    rule.frequency === "DAILY"
  ) {
    return dateGroups.map((dates) =>
      dates.flatMap((date) => byHour.map((hour) => setHours(date, hour)))
    );
  }

  return dateGroups.map((dates) =>
    dates.filter((date) => byHour.includes(getHours(date)))
  );
};
