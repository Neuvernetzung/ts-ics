import { setWeek } from "date-fns";

import type { IcsRecurrenceRule, WeekDayNumber } from "@/types";

export const iterateByWeekNo = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  byWeekNo: NonNullable<IcsRecurrenceRule["byWeekNo"]>,
  weekStartsOn: WeekDayNumber
): Date[][] => {
  if (rule.frequency === "YEARLY") {
    return dateGroups.map((dates) =>
      dates.flatMap((date) =>
        byWeekNo.map((weekNo) => setWeek(date, weekNo, { weekStartsOn }))
      )
    );
  }

  return dateGroups; // Nicht verfügbar für alle anderen Frequencies
};
