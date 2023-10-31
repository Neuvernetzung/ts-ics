/* eslint-disable no-restricted-syntax */
import {
  getDate,
  getMonth,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";

import {
  RecurrenceRuleFrequencyOrdinal,
  VEventRecurrenceRule,
  WeekDayOrdinal,
} from "@/types";

import {
  alwaysTrue,
  and,
  byDayFilter,
  byHourFilter,
  byMinuteFilter,
  byMonthDayFilter,
  bySecondFilter,
  countCondition,
  DatePredicate,
  untilCondition,
  weekIntervalFilter,
} from "./filter";
import {
  bySetPosInstanceGenerator,
  DateGenerator,
  getByDayGenerator,
  getByHourGenerator,
  getByMinuteGenerator,
  getByMonthDateGenerator,
  getByMonthGenerator,
  getBySecondGenerator,
  getByYearDayGenerator,
  getSerialDayGenerator,
  getSerialHourGenerator,
  getSerialMinuteGenerator,
  getSerialMonthGenerator,
  getSerialSecondGenerator,
  getSerialYearGenerator,
  serialInstanceGenerator,
} from "./generators";
import { rRuleIterator } from "./rruleiterator";

export function createRecurrenceIterator(
  rrule: VEventRecurrenceRule,
  dtStart: Date,
  tzid: string,
) {
  let freq = rrule.frequency;

  /*
   * If the given RRULE is malformed and does not have a frequency
   * specified, default to "yearly".
   */
  if (!freq) {
    freq = "YEARLY";
  }

  let wkst = rrule.workweekStart;
  let interval = rrule.interval ?? 0;

  const until = rrule.until;

  let bySetPos = rrule.bySetPos || [];

  let byDay = rrule.byDay || [];
  const byMonth = rrule.byMonth || [];
  let byHour = rrule.byHour || [];
  let byMinute = rrule.byMinute || [];
  let bySecond = rrule.bySecond || [];
  const byYearday = rrule.byYearday || [];
  let byMonthday = rrule.byMonthday || [];
  let byWeekNo = rrule.byWeekNo || [];

  // let canShortcutAdvance = true;

  if (interval <= 0) {
    interval = 1;
  }

  if (!wkst) {
    wkst = "MO";
  }

  // optimize out BYSETPOS where possible
  if (bySetPos.length > 0) {
    switch (freq) {
      case "HOURLY":
        if (byHour.length > 0 && byMinute.length <= 1 && bySecond.length <= 1) {
          byHour = filterBySetPos(byHour, bySetPos);
        }

        /*
         * Handling bySetPos for rules that are more frequent than daily
         * tends to lead to large amounts of processor being used before
         * other work limiting features can kick in since there many
         * seconds between dtStart and where the year limit kicks in.
         * There are no known use cases for the use of bySetPos with
         * hourly minutely and secondly rules so we just ignore it.
         */
        bySetPos = [];
        break;
      case "MINUTELY":
        if (byMinute.length > 0 && bySecond.length <= 1) {
          byMinute = filterBySetPos(byMinute, bySetPos);
        }

        // see bySetPos handling comment above
        bySetPos = [];
        break;
      case "SECONDLY":
        if (bySecond.length > 0) {
          bySecond = filterBySetPos(bySecond, bySetPos);
        }

        // see bySetPos handling comment above
        bySetPos = [];
        break;
      default:
    }

    // canShortcutAdvance = false;
  }

  let start = dtStart;
  if (bySetPos.length > 0) {
    /*
     * Roll back until the beginning of the period to make sure that any
     * positive indices are indexed properly. The actual iterator
     * implementation is responsible for anything < dtStart.
     */
    switch (freq) {
      case "YEARLY":
        start = startOfYear(start);

        break;
      case "MONTHLY":
        start = startOfMonth(start);

        break;
      case "WEEKLY":
        start = startOfWeek(start, {
          weekStartsOn: WeekDayOrdinal[wkst],
        });
        break;
      default:
        break;
    }
  }

  /*
   * Recurrences are implemented as a sequence of periodic generators.
   * First a year is generated, and then months, and within months, days.
   */
  const yearGenerator = getSerialYearGenerator(
    freq === "YEARLY" ? interval : 1,
    dtStart,
  );
  let monthGenerator: DateGenerator | undefined;
  let dayGenerator: DateGenerator | undefined;
  let secondGenerator: DateGenerator | undefined;
  let minuteGenerator: DateGenerator | undefined;
  let hourGenerator: DateGenerator | undefined;

  /*
   * When multiple generators are specified for a period, they act as a
   * union operator. We could have multiple generators (say, for day) and
   * then run each and merge the results, but some generators are more
   * efficient than others. So to avoid generating 53 Sundays and throwing
   * away all but 1 for RRULE:FREQ=YEARLY;BYDAY=TU;BYWEEKNO=1, we
   * reimplement some of the more prolific generators as filters.
   */
  const filters: ((date: Date) => boolean)[] = [];

  switch (freq) {
    case "SECONDLY":
      if (bySecond.length === 0 || interval !== 1) {
        secondGenerator = getSerialSecondGenerator(interval, dtStart);
        if (bySecond.length > 0) {
          filters.push(bySecondFilter(bySecond));
        }
      }
      break;
    case "MINUTELY":
      if (byMinute.length === 0 || interval !== 1) {
        minuteGenerator = getSerialMinuteGenerator(interval, dtStart);
        if (byMinute.length > 0) {
          filters.push(byMinuteFilter(byMinute));
        }
      }
      break;
    case "HOURLY":
      if (byHour.length === 0 || interval !== 1) {
        hourGenerator = getSerialHourGenerator(interval, dtStart);
        if (byHour.length > 0) {
          filters.push(byHourFilter(byHour));
        }
      }
      break;
    case "DAILY":
      break;
    case "WEEKLY":
      /*
       * Week is not considered a period because a week may span multiple
       * months and/or years. There are no week generators, so a filter is
       * used to make sure that FREQ=WEEKLY;INTERVAL=2 only generates
       * dates within the proper week.
       */
      if (byDay.length > 0) {
        dayGenerator = getByDayGenerator(byDay, start, false);
        byDay = [];
        if (interval > 1) {
          filters.push(weekIntervalFilter(interval, wkst, dtStart));
        }
      } else {
        dayGenerator = getSerialDayGenerator(interval * 7, dtStart);
      }
      break;
    case "YEARLY":
      if (byYearday.length > 0) {
        /*
         * The BYYEARDAY rule part specifies a COMMA separated list of
         * days of the year. Valid values are 1 to 366 or -366 to -1.
         * For example, -1 represents the last day of the year (December
         * 31st) and -306 represents the 306th to the last day of the
         * year (March 1st).
         */
        dayGenerator = getByYearDayGenerator(byYearday, start);
        break;
      }
    // $FALL-THROUGH$
    // eslint-disable-next-line no-fallthrough
    case "MONTHLY": {
      if (byMonthday.length > 0) {
        /*
         * The BYMONTHDAY rule part specifies a COMMA separated list of
         * days of the month. Valid values are 1 to 31 or -31 to -1. For
         * example, -10 represents the tenth to the last day of the
         * month.
         */
        dayGenerator = getByMonthDateGenerator(byMonthday, start);
        byMonthday = [];
      } else if (byWeekNo.length > 0 && freq === "YEARLY") {
        /*
         * The BYWEEKNO rule part specifies a COMMA separated list of
         * ordinals specifying weeks of the year. This rule part is only
         * valid for YEARLY rules.
         */
        // dayGenerator = getByWeekNoGenerator(byWeekNo, wkst, start);
        byWeekNo = [];
      } else if (byDay.length > 0) {
        /*
         * Each BYDAY value can also be preceded by a positive (n) or
         * negative (-n) integer. If present, this indicates the nth
         * occurrence of the specific day within the MONTHLY or YEARLY
         * RRULE. For example, within a MONTHLY rule, +1MO (or simply
         * 1MO) represents the first Monday within the month, whereas
         * -1MO represents the last Monday of the month. If an integer
         * modifier is not present, it means all days of this type
         * within the specified frequency. For example, within a MONTHLY
         * rule, MO represents all Mondays within the month.
         */
        dayGenerator = getByDayGenerator(
          byDay,
          start,
          freq === "YEARLY" && byMonth.length === 0,
        );
        byDay = [];
      } else {
        if (freq === "YEARLY") {
          monthGenerator = getByMonthGenerator([getMonth(dtStart)], start);
        }
        dayGenerator = getByMonthDateGenerator([getDate(dtStart)], start);
      }
      break;
    }
    default:
      throw new Error("Unknow frequency");
  }

  if (!secondGenerator) {
    secondGenerator = getBySecondGenerator(bySecond, start);
  }
  if (!minuteGenerator) {
    if (
      byMinute.length === 0 &&
      RecurrenceRuleFrequencyOrdinal[freq] <
        RecurrenceRuleFrequencyOrdinal.MINUTELY
    ) {
      minuteGenerator = getSerialMinuteGenerator(1, dtStart);
    } else {
      minuteGenerator = getByMinuteGenerator(byMinute, start);
    }
  }
  if (!hourGenerator) {
    if (
      byHour.length === 0 &&
      RecurrenceRuleFrequencyOrdinal[freq] <
        RecurrenceRuleFrequencyOrdinal.HOURLY
    ) {
      hourGenerator = getSerialHourGenerator(1, dtStart);
    } else {
      hourGenerator = getByHourGenerator(byHour, start);
    }
  }

  if (!dayGenerator) {
    const dailyOrMoreOften =
      RecurrenceRuleFrequencyOrdinal[freq] <=
      RecurrenceRuleFrequencyOrdinal.DAILY;
    if (byMonthday.length > 0) {
      dayGenerator = getByMonthDateGenerator(byMonthday, start);
      byMonthday = [];
    } else if (byDay.length > 0) {
      dayGenerator = getByDayGenerator(byDay, start, freq === "YEARLY");
      byDay = [];
    } else if (dailyOrMoreOften) {
      dayGenerator = getSerialDayGenerator(
        freq === "DAILY" ? interval : 1,
        dtStart,
      );
    } else {
      dayGenerator = getByMonthDateGenerator([getDate(dtStart)], start);
    }
  }

  if (byDay.length > 0) {
    filters.push(byDayFilter(byDay, wkst, freq === "YEARLY"));
    byDay = [];
  }

  if (byMonthday.length > 0) {
    filters.push(byMonthDayFilter(byMonthday));
  }

  // generator inference common to all periods
  if (byMonth.length > 0) {
    monthGenerator = getByMonthGenerator(byMonth, start);
  } else if (!monthGenerator) {
    monthGenerator = getSerialMonthGenerator(
      freq === "MONTHLY" ? interval : 1,
      dtStart,
    );
  }

  /*
   * The condition tells the iterator when to halt. The condition is
   * exclusive, so the date that triggers it will not be included.
   */
  let condition: DatePredicate;
  if (rrule.count) {
    condition = countCondition(rrule.count);

    /*
     * We can't shortcut because the countCondition must see every
     * generated instance.
     *
     * TODO(msamuel): If count is large, we might try predicting the end
     * date so that we can convert the COUNT condition to an UNTIL
     * condition.
     */
    // canShortcutAdvance = false;
  } else if (until?.date) {
    condition = untilCondition(until.date);
  } else {
    condition = alwaysTrue;
  }

  // combine filters into a single function
  const filter: DatePredicate = and(filters);

  let instanceGenerator;
  if (bySetPos.length > 0) {
    instanceGenerator = bySetPosInstanceGenerator(
      bySetPos,
      freq,
      wkst,
      filter,
      yearGenerator,
      monthGenerator,
      dayGenerator,
      hourGenerator,
      minuteGenerator,
      secondGenerator,
    );
  } else {
    instanceGenerator = serialInstanceGenerator(
      filter,
      yearGenerator,
      monthGenerator,
      dayGenerator,
      hourGenerator,
      minuteGenerator,
      secondGenerator,
    );
  }

  return rRuleIterator(
    dtStart,
    tzid,
    condition,
    instanceGenerator,
    yearGenerator,
    monthGenerator,
    dayGenerator,
    hourGenerator,
    minuteGenerator,
    secondGenerator,
  );
}

/**
 * Creates an optimized version of an array based on the given BYSETPOS array
 * For example, given the array `BYMONTH=2,3,4,5` and a BYSETPOS of `BYSETPOS=1,-1`, this method will return `BYMONTH=2,5`.
 */
const filterBySetPos = (members: number[], bySetPos: number[]): number[] => {
  const memberSet = Array.from(new Set(members));
  const iset = new Set<number>();
  for (let pos of bySetPos) {
    if (pos === 0) {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (pos < 0) {
      pos += memberSet.length;
    } else {
      pos -= 1; // Zero-index.
    }
    if (pos >= 0 && pos < memberSet.length) {
      iset.add(memberSet[pos]);
    }
  }
  return Array.from(iset);
};
