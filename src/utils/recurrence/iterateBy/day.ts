import {
  addMinutes,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfYear,
  getDay,
  isWithinInterval,
  setDay,
  startOfDay,
  startOfMonth,
  startOfYear,
  subWeeks,
} from "date-fns";

import { type RecurrenceRule, WeekDayNumber, weekDays } from "@/types";

export const iterateByDay = (
  rule: RecurrenceRule,
  dateGroups: Date[][],
  byDay: NonNullable<RecurrenceRule["byDay"]>
): Date[][] => {
  const weekStartsOn = (((rule.workweekStart
    ? weekDays.indexOf(rule.workweekStart)
    : 0) +
    1) %
    7) as WeekDayNumber;

  const dayIndeces = byDay.map(({ day, occurence }) => ({
    occurence,
    day: (weekDays.indexOf(day) - (weekStartsOn - 1) + 7) % 7,
  }));

  if (rule.frequency === "YEARLY") {
    if (rule.byYearday || rule.byMonthday) {
      return dateGroups.map((dates) =>
        dates.filter((date) =>
          dayIndeces.find(({ day }) => day === getDay(date))
        )
      );
    }

    if (rule.byWeekNo) {
      return dateGroups.map((dates) =>
        dates
          .map((date) =>
            dayIndeces.map(({ day }) => setDay(date, day, { weekStartsOn }))
          )
          .flat()
      );
    }

    if (rule.byMonth) {
      return dateGroups.map((dates) =>
        dates
          .map((date) =>
            dayIndeces
              .map(({ day, occurence }) =>
                expandByOccurence(
                  ignoreLocalTz(startOfMonth(date)),
                  ignoreLocalTz(endOfMonth(date)),
                  day,
                  weekStartsOn,
                  occurence
                )
              )
              .flat()
          )
          .flat()
      );
    }

    return dateGroups.map((dates) =>
      dates
        .map((date) =>
          dayIndeces
            .map(({ day, occurence }) =>
              expandByOccurence(
                ignoreLocalTz(startOfYear(date)),
                ignoreLocalTz(endOfYear(date)),
                day,
                weekStartsOn,
                occurence
              )
            )
            .flat()
        )
        .flat()
    );
  }

  if (rule.frequency === "MONTHLY") {
    if (rule.byMonthday) {
      return dateGroups.map((dates) =>
        dates.filter((date) =>
          dayIndeces.find(({ day }) => day === getDay(date))
        )
      );
    }

    return dateGroups.map((dates) =>
      dates
        .map((date) =>
          dayIndeces
            .map(({ day, occurence }) =>
              expandByOccurence(
                ignoreLocalTz(startOfMonth(date)),
                ignoreLocalTz(endOfMonth(date)),
                day,
                weekStartsOn,
                occurence
              )
            )
            .flat()
        )
        .flat()
    );
  }

  if (rule.frequency === "WEEKLY") {
    return dateGroups.map((dates) =>
      dates
        .map((date) =>
          dayIndeces.map(({ day }) => setDay(date, day, { weekStartsOn }))
        )
        .flat()
    );
  }

  return dateGroups.map((dates) =>
    dates.filter((date) => dayIndeces.find(({ day }) => day === getDay(date)))
  );
};

const expandByOccurence = (
  start: Date,
  end: Date,
  day: number,
  weekStartsOn: WeekDayNumber,
  occurence?: number
) => {
  if (occurence !== undefined) {
    const isNegative = occurence < 0;

    if (!isNegative) {
      const firstDay = setDay(start, day, { weekStartsOn });
      const isPrevious = start > firstDay;

      const nthDay = addWeeks(
        firstDay,
        (occurence || 1) - 1 + (isPrevious ? 1 : 0)
      );
      return nthDay;
    }
    const lastDay = setDay(end, day, { weekStartsOn });

    const isAfter = end < lastDay;

    const nthDay = ignoreLocalTz(
      startOfDay(subWeeks(lastDay, -(occurence || 1) - 1 + (isAfter ? 1 : 0)))
    );
    return nthDay;
  }

  const days = eachDayOfInterval({
    start,
    end,
  })
    .map((d) => ignoreLocalTz(d))
    .filter((d) => isWithinInterval(d, { start, end }));

  return days.filter((d) => day === getDay(d));
};

const ignoreLocalTz = (date: Date) =>
  addMinutes(date, -date.getTimezoneOffset());
