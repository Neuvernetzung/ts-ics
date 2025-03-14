import { getYear, setDayOfYear } from "date-fns";

import type { IcsRecurrenceRule } from "@/types";

export const iterateByYearDay = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  byYearday: NonNullable<IcsRecurrenceRule["byYearday"]>
): Date[][] => {
  if (rule.frequency === "YEARLY") {
    return dateGroups.map((dates) =>
      dates.flatMap((date) => byYearday.map((year) => setDayOfYear(date, year)))
    );
  }

  if (
    rule.frequency === "MONTHLY" ||
    rule.frequency === "WEEKLY" ||
    rule.frequency === "DAILY"
  )
    return dateGroups; // Nicht verfügbar für Monthly, Weekly und Daily

  return dateGroups.map((dates) =>
    dates.filter((date) => byYearday.includes(getYear(date)))
  );
};
