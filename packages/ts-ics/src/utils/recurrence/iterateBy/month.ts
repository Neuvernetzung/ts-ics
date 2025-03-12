import { getMonth, setMonth } from "date-fns";

import type { IcsRecurrenceRule } from "@/types";

export const iterateByMonth = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  byMonth: NonNullable<IcsRecurrenceRule["byMonth"]>
): Date[][] => {
  if (rule.frequency === "YEARLY") {
    return dateGroups.map((dates) =>
      dates.flatMap((date) => byMonth.map((month) => setMonth(date, month)))
    );
  }

  return dateGroups.map((dates) =>
    dates.filter((date) => byMonth.includes(getMonth(date)))
  );
};
