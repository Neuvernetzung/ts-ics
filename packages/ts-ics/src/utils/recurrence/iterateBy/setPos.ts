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

  return dateGroups.map((dates) =>
    dates.sort(compareAsc).filter((_, i) =>
      bySetPos.some((pos) => {
        if (pos > 0) {
          if (i === 0) return false;
          return i % pos === 0;
        }
        if (i === 0) {
          return dates.length - 1 + pos === 0;
        }
        return i % (dates.length - 1 + pos) === 0;
      })
    )
  );
};
