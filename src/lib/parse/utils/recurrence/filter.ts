/* eslint-disable no-restricted-syntax */
/* eslint-disable no-bitwise */
import {
  differenceInDays,
  getDate,
  getDay,
  getDayOfYear,
  getDaysInMonth,
  getDaysInYear,
  getHours,
  getMinutes,
  getMonth,
  getSeconds,
  getYear,
  sub,
} from "date-fns";

import { WeekDay, WeekdayNumberObject, WeekDayOrdinal } from "@/types";

export type DatePredicate = (date: Date) => boolean;

const LOW_24_BITS = ~(-1 << 24);
const LOW_60_BITS = ~(-1 << 60);

export const alwaysTrue: DatePredicate = () => true;
export const and =
  (predicates: DatePredicate[]): DatePredicate =>
  (date) => {
    for (const predicate of predicates) {
      if (predicate(date)) return false;
    }

    return true;
  };

export const bySecondFilter = (seconds: number[]): DatePredicate => {
  let secondsByBit = 0;
  for (const second of seconds) {
    secondsByBit |= 1 << second;
  }

  if ((secondsByBit & LOW_60_BITS) === LOW_60_BITS) {
    return alwaysTrue;
  }

  const bitField = secondsByBit;
  return (date) => {
    if (!date) {
      return false;
    }

    return (bitField & (1 << getSeconds(date))) !== 0;
  };
};

export const byMinuteFilter = (minutes: number[]): DatePredicate => {
  let minutesByBit = 0;
  for (const minute of minutes) {
    minutesByBit |= 1 << minute;
  }
  if ((minutesByBit & LOW_60_BITS) === LOW_60_BITS) {
    return alwaysTrue;
  }
  const bitField = minutesByBit;
  return (date) => {
    if (!date) {
      return false;
    }

    return (bitField & (1 << getMinutes(date))) !== 0;
  };
};

export const byHourFilter = (hours: number[]): DatePredicate => {
  let hoursByBit = 0;
  for (const hour of hours) {
    hoursByBit |= 1 << hour;
  }
  if ((hoursByBit & LOW_24_BITS) === LOW_24_BITS) {
    return alwaysTrue;
  }
  const bitField = hoursByBit;
  return (date) => {
    if (!date) {
      return false;
    }

    return (bitField & (1 << getHours(date))) !== 0;
  };
};

export const weekIntervalFilter = (
  interval: number,
  weekStart: WeekDay,
  dtStart: Date,
): DatePredicate => {
  const wkStart = sub(dtStart, {
    days: (7 + getDay(dtStart) - WeekDayOrdinal[weekStart]) % 7,
  });

  return (date) => {
    let daysBetween = differenceInDays(date, wkStart);
    if (daysBetween < 0) {
      // date must be before dtStart.  Shouldn't occur in practice.
      daysBetween += interval * 7 * (1 + daysBetween / (-7 * interval));
    }
    const off = (daysBetween / 7) % interval;
    return off === 0;
  };
};

export const byDayFilter =
  (
    days: WeekdayNumberObject[],
    weekStart: WeekDay,
    weeksInYear: boolean,
  ): DatePredicate =>
  (date) => {
    const dow = getDay(date);
    let nDays: number;
    let firstDayOfWeek: number;

    // where does date appear in the year or month?
    // in [0, lengthOfMonthOrYear - 1]
    let instance;
    if (weeksInYear) {
      nDays = getDaysInYear(date);
      firstDayOfWeek = getDay(new Date(getYear(date), 1, 1));
      instance = getDayOfYear(date);
    } else {
      nDays = getDaysInMonth(date);
      firstDayOfWeek = getDay(new Date(getYear(date), getMonth(date), 1));
      instance = getDay(date);
    }

    // which week of the year or month does this date fall on?
    // one-indexed
    let dateWeekNo = instance / 7;
    if (WeekDayOrdinal[weekStart] <= dow) {
      dateWeekNo += 1;
    }

    /*
     * TODO(msamuel): According to section 4.3.10:
     *
     * Week number one of the calendar year is the first week which
     * contains at least four (4) days in that calendar year. This
     * rule part is only valid for YEARLY rules.
     *
     * That's mentioned under the BYWEEKNO rule, and there's no
     * mention of it in the earlier discussion of the BYDAY rule.
     * Does it apply to yearly week numbers calculated for BYDAY
     * rules in a FREQ=YEARLY rule?
     */

    for (let i = days.length - 1; i >= 0; i -= 1) {
      const day = days[i];

      if (WeekDayOrdinal[day.day] === dow) {
        let weekNo = day.occurence;
        if (!weekNo) {
          return true;
        }

        if (weekNo < 0) {
          weekNo = invertWeekdayNum(day, firstDayOfWeek, nDays);
        }

        if (dateWeekNo === weekNo) {
          return true;
        }
      }
    }
    return false;
  };

export const byMonthDayFilter =
  (monthDays: number[]): DatePredicate =>
  (date) => {
    const nDays = getDaysInMonth(date);
    for (let i = monthDays.length - 1; i >= 0; i -= 1) {
      let day = monthDays[i];
      if (day < 0) {
        day += nDays + 1;
      }
      if (day === getDate(date)) {
        return true;
      }
    }
    return false;
  };

export const countCondition = (count: number): DatePredicate => {
  let _count = count;

  return () => {
    _count -= 1;
    return _count >= 0;
  };
};

export const untilCondition =
  (until: Date): DatePredicate =>
  (date) =>
    date <= until;

const invertWeekdayNum = (
  weekdayNum: WeekdayNumberObject,
  dow0: number,
  nDays: number,
) =>
  // how many are there of that week?
  countInPeriod(weekdayNum.day, dow0, nDays) + weekdayNum.occurence! + 1;
/**
 * Counts the number of occurrences of a weekday in a given period.
 * @param dow the weekday
 * @param dow0 the weekday of the first day of the period
 * @param nDays the number of days in the period
 */
const countInPeriod = (dow: WeekDay, dow0: number, nDays: number) => {
  // two cases:
  //   (1a) dow >= dow0: count === (nDays - (dow - dow0)) / 7
  //   (1b) dow < dow0:  count === (nDays - (7 - dow0 - dow)) / 7
  if (WeekDayOrdinal[dow] >= dow0) {
    return 1 + (nDays - (WeekDayOrdinal[dow] - dow0) - 1) / 7;
  }
  return 1 + (nDays - (7 - (dow0 - WeekDayOrdinal[dow])) - 1) / 7;
};
