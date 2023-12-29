import { setWeek } from "date-fns";

import type { RecurrenceRule, WeekDayNumber } from "@/types";

export const iterateByWeekNo = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byWeekNo: NonNullable<RecurrenceRule["byWeekNo"]>,
  weekStartsOn: WeekDayNumber
): Date[][] => {
  if (rule.frequency === "YEARLY") {
    return dateGroups.map((dates) =>
      dates
        .map((date) =>
          byWeekNo.map((weekNo) => setWeek(date, weekNo, { weekStartsOn }))
        )
        .flat()
    );
  }

  return dateGroups; // Nicht verfügbar für alle anderen Frequencies
};
