import { getMonth, setMonth } from "date-fns";

import type { RecurrenceRule } from "@/types";

export const iterateByMonth = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byMonth: NonNullable<RecurrenceRule["byMonth"]>
): Date[][] => {
  if (rule.frequency === "YEARLY") {
    return dateGroups.map((dates) =>
      dates.map((date) => byMonth.map((month) => setMonth(date, month))).flat()
    );
  }

  return dateGroups.map((dates) =>
    dates.filter((date) => byMonth.includes(getMonth(date)))
  );
};
