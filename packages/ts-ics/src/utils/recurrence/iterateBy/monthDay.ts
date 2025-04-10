import { getDaysInMonth, getMonth, setDate } from "date-fns";

import type { IcsRecurrenceRule } from "@/types";

export const iterateByMonthDay = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  byMonthday: NonNullable<IcsRecurrenceRule["byMonthday"]>
): Date[][] => {
  if (rule.frequency === "YEARLY" || rule.frequency === "MONTHLY") {
    return dateGroups.map((dates) =>
      dates.flatMap((date) => {
        const daysInMonth = getDaysInMonth(date);

        return byMonthday
          .map(
            (day) => (day > daysInMonth ? undefined : setDate(date, day)) // Invalide Dates entfernen z.B. 30. FEB
          )
          .filter((v) => !!v);
      })
    );
  }

  if (rule.frequency === "WEEKLY") return dateGroups; // Nicht verfügbar für Weekly

  return dateGroups.map((dates) =>
    dates.filter((date) => byMonthday.includes(getMonth(date)))
  );
};
