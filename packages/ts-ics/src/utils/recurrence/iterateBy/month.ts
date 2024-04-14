import { getMonth, setMonth } from "date-fns";

import type { RecurrenceRule } from "@/types";

export const iterateByMonth = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byMonth: NonNullable<RecurrenceRule["byMonth"]>
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
