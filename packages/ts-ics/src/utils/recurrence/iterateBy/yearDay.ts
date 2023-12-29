import { getYear, setDayOfYear } from "date-fns";

import type { RecurrenceRule } from "@/types";

export const iterateByYearDay = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byYearday: NonNullable<RecurrenceRule["byYearday"]>
): Date[][] => {
  if (rule.frequency === "YEARLY") {
    return dateGroups.map((dates) =>
      dates
        .map((date) => byYearday.map((year) => setDayOfYear(date, year)))
        .flat()
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
