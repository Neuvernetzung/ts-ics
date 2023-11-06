import { setWeek } from "date-fns";

import type { RecurrenceRule } from "@/types";

export const iterateByWeekNo = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byWeekNo: NonNullable<RecurrenceRule["byWeekNo"]>
): Date[][] => {
  if (rule.frequency === "YEARLY") {
    return dateGroups.map((dates) =>
      dates
        .map((date) =>
          byWeekNo.map((weekNo) => setWeek(date, weekNo, { weekStartsOn: 1 }))
        )
        .flat()
    );
  }

  return dateGroups; // Nicht verfügbar für alle anderen Frequencies
};
