import { compareAsc } from "date-fns";

import type { IcsRecurrenceRule } from "@/types";

export const iterateBySetPos = (
  rule: IcsRecurrenceRule,
  dateGroups: Date[][],
  bySetPos: NonNullable<IcsRecurrenceRule["bySetPos"]>
): Date[][] => {
  if (
    !rule.byYearday &&
    !rule.byWeekNo &&
    !rule.byMonthday &&
    !rule.byMonth &&
    !rule.byDay &&
    !rule.byHour &&
    !rule.byMinute &&
    !rule.bySecond
  )
    return dateGroups; // setPos muss immer mit anderer by-Rule verwendet werden

  return dateGroups.map((dates) => {
    const sorted = [...dates].sort(compareAsc);

    // BYSETPOS ist 1-basiert, negative Werte zählen vom Ende des Sets (-1 = letztes Element).
    return sorted.filter((_, i) =>
      bySetPos.some((pos) =>
        pos > 0 ? i === pos - 1 : i === sorted.length + pos
      )
    );
  });
};
