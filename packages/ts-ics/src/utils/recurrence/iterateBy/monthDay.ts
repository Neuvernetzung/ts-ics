import { getDaysInMonth, getMonth, setDate } from "date-fns";
import compact from "lodash/compact";

import type { RecurrenceRule } from "@/types";

export const iterateByMonthDay = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byMonthday: NonNullable<RecurrenceRule["byMonthday"]>
): Date[][] => {
  if (rule.frequency === "YEARLY" || rule.frequency === "MONTHLY") {
    return dateGroups.map((dates) =>
      dates
        .map((date) => {
          const daysInMonth = getDaysInMonth(date);

          return compact(
            byMonthday.map(
              (day) => (day > daysInMonth ? undefined : setDate(date, day)) // Invalide Dates entfernen z.B. 30. FEB
            )
          );
        })
        .flat()
    );
  }

  if (rule.frequency === "WEEKLY") return dateGroups; // Nicht verfügbar für Weekly

  return dateGroups.map((dates) =>
    dates.filter((date) => byMonthday.includes(getMonth(date)))
  );
};
