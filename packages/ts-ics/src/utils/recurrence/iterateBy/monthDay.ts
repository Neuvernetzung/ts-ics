import { getDate, getDaysInMonth, setDate } from "date-fns";

import type { IcsRecurrenceRule } from "@/types";

// Löst negative Werte vom Monatsende her auf (-1 = letzter Tag) und gibt `undefined` für Tage zurück, die es im Monat nicht gibt (z.B. 30. FEB).
const resolveMonthDay = (day: number, daysInMonth: number) => {
  const resolved = day < 0 ? daysInMonth + day + 1 : day;
  if (resolved < 1 || resolved > daysInMonth) return undefined;
  return resolved;
};

export const iterateByMonthDay = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  byMonthday: NonNullable<IcsRecurrenceRule["byMonthday"]>
): Date[][] => {
  if (rule.frequency === "YEARLY" || rule.frequency === "MONTHLY") {
    return dateGroups.map((dates) =>
      dates.flatMap((date) => {
        const daysInMonth = getDaysInMonth(date);

        return byMonthday.flatMap((day) => {
          const resolved = resolveMonthDay(day, daysInMonth);
          return resolved === undefined ? [] : [setDate(date, resolved)];
        });
      })
    );
  }

  if (rule.frequency === "WEEKLY") return dateGroups; // Nicht verfügbar für Weekly

  return dateGroups.map((dates) =>
    dates.filter((date) => {
      const daysInMonth = getDaysInMonth(date);
      return byMonthday.some(
        (day) => resolveMonthDay(day, daysInMonth) === getDate(date)
      );
    })
  );
};
