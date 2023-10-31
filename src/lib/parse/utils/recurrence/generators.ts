/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import {
  addWeeks,
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
  startOfDay,
  startOfWeek,
  sub,
} from "date-fns";

import {
  RecurrenceRuleFrequency,
  WeekDay,
  WeekdayNumberObject,
  WeekDayOrdinal,
  weekDays,
} from "@/types";

import { DateTimeBuilder } from "./dateTimeBuilder";
import {
  getDayOfTheYear,
  getMonthLength,
  getYearLength,
} from "./dateTimeUtils";
import { DatePredicate } from "./filter";

export type GeneratorFrequency =
  | "YEAR"
  | "MONTH"
  | "DAY"
  | "HOUR"
  | "MINUTE"
  | "SECOND";

export type DateGenerator = {
  (builder: DateTimeBuilder): boolean;
  isSingle?: boolean;
  value?: number;
  workDone?: () => void;
};

export type SerialGeneratorFn = (
  interval: number,
  dtStart: Date,
) => DateGenerator;
export type ByGeneratorFn = (values: number[], dtStart: Date) => DateGenerator;

const MAX_YEARS_BETWEEN_INSTANCES = 1000;

export const getSerialYearGenerator: SerialGeneratorFn = (
  interval,
  dtStart,
) => {
  let year = getYear(sub(dtStart, { years: interval }));
  let throttle = MAX_YEARS_BETWEEN_INSTANCES;

  const fn: DateGenerator = (builder) => {
    throttle -= 1;
    if (throttle < 0) {
      throw new Error("Throttled");
    }

    year += interval;
    builder.year = year;

    return true;
  };

  fn.workDone = () => {
    throttle = MAX_YEARS_BETWEEN_INSTANCES;
  };

  return fn;
};

export const getSerialMonthGenerator: SerialGeneratorFn = (
  interval,
  dtStart,
) => {
  const start = sub(dtStart, { months: interval });

  let year = getYear(start);
  let month = getMonth(start);

  return (builder) => {
    let nmonth = 0;
    if (year !== builder.year) {
      const monthsBetween = (getYear(year) - year) * 12 - (month - 1);
      nmonth = ((interval - (monthsBetween % interval)) % interval) + 1;
      if (nmonth > 12) {
        /*
         * Don't update year so that the difference calculation
         * above is correct when this function is reentered with
         * a different year
         */
        return false;
      }
      year = builder.year;
    } else {
      nmonth = month + interval;
      if (nmonth > 12) {
        return false;
      }
    }
    month = nmonth;
    builder.month = nmonth;

    return true;
  };
};

export const getSerialDayGenerator: SerialGeneratorFn = (interval, dtStart) => {
  const start = sub(dtStart, { days: interval });

  let year = getYear(start);
  let month = getMonth(start);
  let date = getDate(start);

  let nDays = getDaysInMonth(start);

  return (builder) => {
    let ndate = 0;
    if (year === builder.year && month === builder.month) {
      ndate = date + interval;
      if (ndate > nDays) {
        return false;
      }
    } else {
      nDays = getMonthLength(builder.year, builder.month);
      if (interval !== 1) {
        /*
         * Calculate the number of days between the first of the
         * new month and the old date and extend it to make it
         * an integer multiple of interval.
         */
        const daysBetween = differenceInDays(
          new Date(builder.year, builder.month, 1),
          new Date(year, month, date),
        );
        ndate = ((interval - (daysBetween % interval)) % interval) + 1;
        if (ndate > nDays) {
          /*
           * Need to return early without updating year or
           * month so that the next time we enter with a
           * different month, the daysBetween call above
           * compares against the proper last date.
           */
          return false;
        }
      } else {
        ndate = 1;
      }
      year = builder.year;
      month = builder.month;
    }
    date = ndate;
    builder.day = ndate;

    return true;
  };
};

export const getSerialHourGenerator: SerialGeneratorFn = (
  interval,
  dtStart,
) => {
  const start = sub(dtStart, { hours: interval });

  let year = getYear(start);
  let month = getMonth(start);
  let day = getDate(start);
  let hour = getHours(start);

  return (builder) => {
    let nhour = 0;
    if (
      day !== builder.day ||
      month !== builder.month ||
      year !== builder.year
    ) {
      const hoursBetween =
        differenceInDays(startOfDay(builder.date), new Date(year, month, day)) *
          24 -
        hour;
      nhour = (interval - (hoursBetween % interval)) % interval;
      if (nhour > 23) {
        /*
         * Don't update day so that the difference calculation
         * above is correct when this function is reentered with
         * a different day.
         */
        return false;
      }
      day = builder.day;
      month = builder.month;
      year = builder.year;
    } else {
      nhour = hour + interval;
      if (nhour > 23) {
        return false;
      }
    }

    hour = nhour;
    builder.hours = nhour;

    return true;
  };
};

export const getSerialMinuteGenerator: SerialGeneratorFn = (
  interval,
  dtStart,
) => {
  const start = sub(dtStart, { hours: interval });

  let year = getYear(start);
  let month = getMonth(start);
  let day = getDate(start);
  let hour = getHours(start);
  let minute = getMinutes(start);

  return (builder) => {
    let nminute;
    if (
      hour !== builder.hours ||
      day !== builder.day ||
      month !== builder.month ||
      year !== builder.year
    ) {
      const minutesBetween =
        (differenceInDays(
          startOfDay(builder.date),
          new Date(year, month, day),
        ) *
          24 +
          builder.hours -
          hour) *
          60 -
        minute;
      nminute = (interval - (minutesBetween % interval)) % interval;
      if (nminute > 59) {
        /*
         * Don't update day so that the difference calculation
         * above is correct when this function is reentered with
         * a different day.
         */
        return false;
      }
      hour = builder.hours;
      day = builder.day;
      month = builder.month;
      year = builder.year;
    } else {
      nminute = minute + interval;
      if (nminute > 59) {
        return false;
      }
    }
    minute = nminute;
    builder.minutes = nminute;
    return true;
  };
};

export const getSerialSecondGenerator: SerialGeneratorFn = (
  interval,
  dtStart,
) => {
  const start = sub(dtStart, { hours: interval });

  let year = getYear(start);
  let month = getMonth(start);
  let day = getDate(start);
  let hour = getHours(start);
  let minute = getMinutes(start);
  let second = getSeconds(start);

  return (builder) => {
    let nsecond;
    if (
      minute !== builder.minutes ||
      hour !== builder.hours ||
      day !== builder.day ||
      month !== builder.month ||
      year !== builder.year
    ) {
      const secondsBetween =
        (differenceInDays(
          startOfDay(builder.date),
          new Date(year, month, day),
        ) *
          60 +
          builder.minutes -
          minute) *
          60 -
        second;
      nsecond = (interval - (secondsBetween % interval)) % interval;
      if (nsecond > 59) {
        /*
         * Don't update day so that the difference calculation
         * above is correct when this function is reentered with
         * a different day.
         */
        return false;
      }
      minute = builder.minutes;
      hour = builder.hours;
      day = builder.day;
      month = builder.month;
      year = builder.year;
    } else {
      nsecond = second + interval;
      if (nsecond > 59) {
        return false;
      }
    }
    second = nsecond;
    builder.seconds = nsecond;
    return true;
  };
};

export const getByYearGenerator: ByGeneratorFn = (years, dtStart) => {
  const uyears = Array.from(new Set(years));

  let i = 0;
  while (i < uyears.length && getYear(dtStart) > uyears[i]) {
    i += 1;
  }

  return (builder) => {
    if (i >= uyears.length) {
      return false;
    }

    builder.year = uyears[i];
    i += 1;
    return true;
  };
};

export const getByMonthGenerator: ByGeneratorFn = (months, dtStart) => {
  const umonths = Array.from(new Set(months));

  let i = 0;
  let year = getYear(dtStart);

  return (builder) => {
    if (year !== builder.year) {
      i = 0;
      year = builder.year;
    }
    if (i >= umonths.length) {
      return false;
    }

    builder.month = umonths[i];
    i += 1;
    return true;
  };
};

export const getByHourGenerator: ByGeneratorFn = (hours, dtStart) => {
  const uhours =
    hours.length === 0 ? [getHours(dtStart)] : Array.from(new Set(hours));

  if (uhours.length === 1) {
    const hour = uhours[0];

    const fn: DateGenerator = (builder) => {
      builder.hours = hour;
      return true;
    };

    fn.isSingle = true;
    fn.value = hour;
    return fn;
  }

  let i = 0;
  let year = getYear(dtStart);
  let month = getMonth(dtStart);
  let day = getDate(dtStart);
  {
    const hour = getHours(dtStart);
    while (i < uhours.length && uhours[i] < hour) {
      i += 1;
    }
  }

  return (builder) => {
    if (
      year !== builder.year ||
      month !== builder.month ||
      day !== builder.day
    ) {
      i = 0;
      year = builder.year;
      month = builder.month;
      day = builder.day;
    }
    if (i >= uhours.length) {
      return false;
    }

    builder.hours = uhours[i];
    i += 1;

    return true;
  };
};

export const getByMinuteGenerator: ByGeneratorFn = (minutes, dtStart) => {
  const uminutes =
    minutes.length === 0 ? [getMinutes(dtStart)] : Array.from(new Set(minutes));

  if (uminutes.length === 1) {
    const minute = uminutes[0];

    const fn: DateGenerator = (builder) => {
      builder.minutes = minute;
      return true;
    };

    fn.isSingle = true;
    fn.value = minute;
    return fn;
  }

  let i = 0;
  let year = getYear(dtStart);
  let month = getMonth(dtStart);
  let day = getDate(dtStart);
  let hour = getHours(dtStart);
  {
    const minute = getMinutes(dtStart);
    while (i < uminutes.length && uminutes[i] < minute) {
      i += 1;
    }
  }

  return (builder) => {
    if (
      year !== builder.year ||
      month !== builder.month ||
      day !== builder.day ||
      hour !== builder.hours
    ) {
      i = 0;
      year = builder.year;
      month = builder.month;
      day = builder.day;
      hour = builder.hours;
    }
    if (i >= uminutes.length) {
      return false;
    }

    builder.minutes = uminutes[i];
    i += 1;

    return true;
  };
};

export const getBySecondGenerator: ByGeneratorFn = (seconds, dtStart) => {
  const useconds =
    seconds.length === 0 ? [getSeconds(dtStart)] : Array.from(new Set(seconds));

  if (useconds.length === 1) {
    const second = useconds[0];

    const fn: DateGenerator = (builder) => {
      builder.seconds = second;
      return true;
    };

    fn.isSingle = true;
    fn.value = second;
    return fn;
  }

  let i = 0;
  let year = getYear(dtStart);
  let month = getMonth(dtStart);
  let day = getDate(dtStart);
  let hour = getHours(dtStart);
  let minute = getMinutes(dtStart);
  {
    const second = getSeconds(dtStart);
    while (i < useconds.length && useconds[i] < second) {
      i += 1;
    }
  }

  return (builder) => {
    if (
      year !== builder.year ||
      month !== builder.month ||
      day !== builder.day ||
      hour !== builder.hours ||
      minute !== builder.minutes
    ) {
      i = 0;
      year = builder.year;
      month = builder.month;
      day = builder.day;
      hour = builder.hours;
      minute = builder.minutes;
    }
    if (i >= useconds.length) {
      return false;
    }

    builder.seconds = useconds[i];
    i += 1;

    return true;
  };
};

export const getByMonthDateGenerator: ByGeneratorFn = (dates, dtStart) => {
  const udates = Array.from(new Set(dates));

  let year = getYear(dtStart);
  let month = getMonth(dtStart);
  /** list of generated dates for the current month */
  let posDates: number[];
  /** index of next date to return */
  let i = 0;

  const convertDatesToAbsolute = () => {
    const posDatesSet = new Set<number>();
    const nDays = getDaysInMonth(new Date(year, month, 1));
    for (let j = 0; j < udates.length; j += 1) {
      let date = udates[j];
      if (date < 0) {
        date += nDays + 1;
      }
      if (date >= 1 && date <= nDays) {
        posDatesSet.add(date);
      }
    }

    posDates = Array.from(posDatesSet);
  };

  convertDatesToAbsolute();

  return (builder) => {
    if (year !== builder.year || month !== builder.month) {
      year = builder.year;
      month = builder.month;

      convertDatesToAbsolute();

      i = 0;
    }
    if (i >= posDates.length) {
      return false;
    }

    builder.day = posDates[i];
    i += 1;

    return true;
  };
};

export const getByDayGenerator = (
  days: WeekdayNumberObject[],
  dtStart: Date,
  weeksInYear: boolean,
): DateGenerator => {
  const udays = [...days];

  let year = getYear(dtStart);
  let month = getMonth(dtStart);
  /** list of generated dates for the current month */
  let dates: number[] = [];
  /** index of next date to return */
  let i = 0;

  const generateDates = () => {
    let nDays: number;
    let dow0: WeekDay;
    const nDaysInMonth = getDaysInMonth(new Date(year, month, 1));
    // index of the first day of the month in the month or year
    let d0: number;

    if (weeksInYear) {
      nDays = getDaysInYear(new Date(year, 1, 1));
      dow0 = weekDays[getDay(new Date(year, 1, 1))];
      d0 = getDayOfYear(new Date(year, month, 1));
    } else {
      nDays = nDaysInMonth;
      dow0 = weekDays[getDay(new Date(year, month, 1))];
      d0 = 0;
    }

    /*
     * An index not greater than the first week of the month in the
     * month or year.
     */
    const w0 = d0 / 7;

    /*
     * Iterate through days and resolve each [week, day of week]
     * pair to a day of the month.
     */
    const udates = new Set<number>();
    for (const day of udays) {
      if (day.occurence) {
        const date = dayNumToDate(
          dow0,
          nDays,
          day.occurence,
          day.day,
          d0,
          nDaysInMonth,
        );
        if (date !== 0) {
          udates.add(date);
        }
      } else {
        const wn = w0 + 6;
        for (let w = w0; w <= wn; w += 1) {
          const date = dayNumToDate(dow0, nDays, w, day.day, d0, nDaysInMonth);
          if (date !== 0) {
            udates.add(date);
          }
        }
      }
    }

    dates = Array.from(udates);
  };

  {
    generateDates();
    const day = getDate(dtStart);
    while (i < dates.length && dates[i] < day) {
      i += 1;
    }
  }

  return (builder) => {
    if (year !== builder.year || month !== builder.month) {
      year = builder.year;
      month = builder.month;

      generateDates();
      // start at the beginning of the month
      i = 0;
    }
    if (i >= dates.length) {
      return false;
    }

    builder.day = dates[i];
    i += 1;

    return true;
  };
};

export const getByYearDayGenerator = (
  yearDays: number[],
  dtStart: Date,
): DateGenerator => {
  const uYearDays = Array.from(new Set(yearDays));

  let year = getYear(dtStart);
  let month = getMonth(dtStart);
  let dates: number[] = [];
  let i = 0;

  const checkMonth = () => {
    // now, calculate the first week of the month
    const doyOfMonth1 = getDayOfTheYear(year, month, 1);
    const nDays = getMonthLength(year, month);
    const nYearDays = getYearLength(year);
    const udates = new Set<number>();
    for (let yearDay of uYearDays) {
      if (yearDay < 0) {
        yearDay += nYearDays + 1;
      }

      const date = yearDay - doyOfMonth1;
      if (date >= 1 && date <= nDays) {
        udates.add(date);
      }
    }

    dates = Array.from(udates);
  };

  checkMonth();

  return (builder) => {
    if (year !== builder.year || month !== builder.month) {
      year = builder.year;
      month = builder.month;

      checkMonth();

      i = 0;
    }

    if (i >= dates.length) {
      return false;
    }

    builder.day = dates[i];
    i += 1;
    return true;
  };
};

export const serialInstanceGenerator = (
  filter: DatePredicate,
  yearGenerator: DateGenerator,
  monthGenerator: DateGenerator,
  dayGenerator: DateGenerator,
  hourGenerator: DateGenerator,
  minuteGenerator: DateGenerator,
  secondGenerator: DateGenerator,
): DateGenerator => {
  if (skipSubDayGenerators(hourGenerator, minuteGenerator, secondGenerator)) {
    // fast case for generators that are not more frequent than daily
    return (builder) => {
      // cascade through periods to compute the next date
      do {
        // until we run out of days in the current month
        while (!dayGenerator(builder)) {
          // until we run out of months in the current year
          while (!monthGenerator(builder)) {
            // if there are more years available fetch one
            if (!yearGenerator(builder)) {
              // otherwise the recurrence is exhausted
              return false;
            }
          }
        }
        // apply filters to generated dates
      } while (!filter(builder.date));

      return true;
    };
  }
  return (builder) => {
    // cascade through periods to compute the next date
    do {
      // until we run out of seconds in the current minute
      while (!secondGenerator(builder)) {
        // until we run out of minutes in the current hour
        while (!minuteGenerator(builder)) {
          // until we run out of hours in the current day
          while (!hourGenerator(builder)) {
            // until we run out of days in the current month
            while (!dayGenerator(builder)) {
              // until we run out of months in the current year
              while (!monthGenerator(builder)) {
                // if there are more years available fetch one
                if (!yearGenerator(builder)) {
                  // otherwise the recurrence is exhausted
                  return false;
                }
              }
            }
          }
        }
      }
      // apply filters to generated dates
    } while (!filter(builder.date));
    // TODO: maybe group the filters into different kinds so we don't
    // apply filters that only affect days to every second.

    return true;
  };
};

export const bySetPosInstanceGenerator = (
  setPos: number[],
  freq: RecurrenceRuleFrequency,
  wkst: WeekDay,
  filter: DatePredicate,
  yearGenerator: DateGenerator,
  monthGenerator: DateGenerator,
  dayGenerator: DateGenerator,
  hourGenerator: DateGenerator,
  minuteGenerator: DateGenerator,
  secondGenerator: DateGenerator,
): DateGenerator => {
  const uSetPos = Array.from(new Set(setPos));

  const serial: DateGenerator = serialInstanceGenerator(
    filter,
    yearGenerator,
    monthGenerator,
    dayGenerator,
    hourGenerator,
    minuteGenerator,
    secondGenerator,
  );

  // TODO(msamuel): does this work?
  const maxPos = uSetPos[uSetPos.length - 1];
  const allPositive = uSetPos[0] > 0;

  let pushback: Date | undefined;

  /**
   * Is this the first instance we generate? We need to know so that
   * we don't clobber dtStart.
   */
  let first = true;

  /**
   * Do we need to halt iteration once the current set has been used?
   */
  let done = false;

  /**
   * The elements in the current set, filtered by set pos.
   */
  let candidates: Date[] = [];

  /**
   * Index into candidates. The number of elements in candidates
   * already consumed.
   */
  let i: number;

  return (builder) => {
    const result = builder;
    while (!candidates || i >= candidates.length) {
      if (done) {
        return false;
      }

      /*
       * (1) Make sure that builder is appropriately initialized
       * so that we only generate instances in the next set.
       */
      let d0: Date | undefined;
      if (pushback) {
        d0 = pushback;
        builder.year = getYear(d0);
        builder.month = getMonth(d0);
        builder.day = getDate(d0);
        pushback = undefined;
      } else if (!first) {
        /*
         * We need to skip ahead to the next item since we
         * didn't exhaust the last period.
         */
        switch (freq) {
          case "YEARLY": {
            const yearResult = yearGenerator(result);
            if (!yearResult) {
              return false;
            }

            break;
          }
          // $FALL-THROUGH$
          case "MONTHLY":
            while (!monthGenerator(builder)) {
              if (!yearGenerator(builder)) {
                return false;
              }
            }
            break;
          case "WEEKLY": {
            // consume because just incrementing date doesn't do anything
            const nextWeek = startOfWeek(addWeeks(builder.date, 1), {
              weekStartsOn: WeekDayOrdinal[wkst],
            });
            do {
              if (!serial(builder)) {
                return false;
              }
            } while (builder.date < nextWeek);
            d0 = builder.date;
            break;
          }
          default:
            break;
        }
      } else {
        first = false;
      }

      /*
       * (2) Build a set of the dates in the year/month/week that
       * match the other rule.
       */
      const dates: Date[] = [];
      if (d0) {
        dates.push(d0);
      }

      /*
       * Optimization: if min(bySetPos) > 0 then we already have
       * absolute positions, so we don't need to generate all of
       * the instances for the period. This speeds up things like
       * the first weekday of the year:
       *
       * RRULE:FREQ=YEARLY;BYDAY=MO,TU,WE,TH,FR,BYSETPOS=1
       *
       * That would otherwise generate 260+ instances per one
       * emitted.
       */
      const limit = allPositive ? maxPos : 1_000_000;

      while (limit > dates.length) {
        if (!serial(builder)) {
          /*
           * If we can't generate any, then make sure we
           * return false once the instances we have generated
           * are exhausted. If this is returning false due to
           * some artificial limit, such as the 100 year limit
           * in serialYearGenerator, then we exit via an
           * exception because otherwise we would pick the
           * wrong elements for some uSetPoses that contain
           * negative elements.
           */
          done = true;
          break;
        }
        const d = builder.date;
        let contained: boolean = false;
        if (!d0) {
          d0 = d;
          contained = true;
        } else {
          switch (freq) {
            case "WEEKLY": {
              const nb = differenceInDays(d, d0);
              /*
               * Two dates (d, d0) are in the same week if
               * there isn't a whole week in between them and
               * the later day is later in the week than the
               * earlier day.
               */
              contained =
                nb < 7 &&
                (7 +
                  WeekDayOrdinal[weekDays[getDay(d)]] -
                  WeekDayOrdinal[wkst]) %
                  7 >
                  (7 +
                    WeekDayOrdinal[weekDays[getDay(d0)]] -
                    WeekDayOrdinal[wkst]) %
                    7;
              break;
            }
            case "MONTHLY":
              contained =
                getMonth(d0) === getMonth(d) && getYear(d0) === getYear(d);
              break;
            case "YEARLY":
              contained = getYear(d0) === getYear(d);
              break;
            default:
              done = true;
              return false;
          }
        }
        if (contained) {
          dates.push(d);
        } else {
          // reached end of the set
          pushback = d; // save d so we can use it later
          break;
        }
      }

      /*
       * (3) Resolve the positions to absolute positions and order
       * them.
       */
      let absSetPos: number[];
      if (allPositive) {
        absSetPos = uSetPos;
      } else {
        const uAbsSetPos = new Set<number>();
        for (let p of uSetPos) {
          if (p < 0) {
            p = dates.length + p + 1;
          }

          uAbsSetPos.add(p);
        }

        absSetPos = Array.from(uAbsSetPos);
      }

      candidates = [];
      for (const p of absSetPos) {
        if (p >= 1 && p <= dates.length) {
          // p is 1-indexed
          candidates.push(dates[p - 1]);
        }
      }
      i = 0;
      if (candidates.length === 0) {
        // none in this region, so keep looking
        candidates = [];
        continue;
      }
    }

    /*
     * (5) Emit a date. It will be checked against the end condition
     * and dtStart elsewhere.
     */
    const d = candidates[i];
    i += 1;

    builder.year = getYear(d);
    builder.month = getMonth(d);
    builder.day = getDate(d);
    builder.hours = getHours(d);
    builder.minutes = getMinutes(d);
    builder.seconds = getSeconds(d);

    return true;
  };
};

export const skipSubDayGenerators = (
  hourGenerator: DateGenerator,
  minuteGenerator: DateGenerator,
  secondGenerator: DateGenerator,
) =>
  secondGenerator.isSingle &&
  minuteGenerator.isSingle &&
  hourGenerator.isSingle;

const dayNumToDate = (
  dow0: WeekDay,
  nDays: number,
  weekNum: number,
  dow: WeekDay,
  d0: number,
  nDaysInMonth: number,
) => {
  // if dow is wednesday, then this is the date of the first wednesday
  const firstDateOfGivenDow =
    1 + ((7 + WeekDayOrdinal[dow] - WeekDayOrdinal[dow0]) % 7);

  let date;
  if (weekNum > 0) {
    date = (weekNum - 1) * 7 + firstDateOfGivenDow - d0;
  } else {
    // count weeks from end of month
    // calculate last day of the given dow
    // since nDays <= 366, this should be > nDays
    let lastDateOfGivenDow = firstDateOfGivenDow + 7 * 54;
    lastDateOfGivenDow -= 7 * ((lastDateOfGivenDow - nDays + 6) / 7);
    date = lastDateOfGivenDow + 7 * (weekNum + 1) - d0;
  }
  return date <= 0 || date > nDaysInMonth ? 0 : date;
};
