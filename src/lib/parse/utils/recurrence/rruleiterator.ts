import { DateTimeBuilder } from "./dateTimeBuilder";
import { DateRecurrenceIterator } from "./dateTimeUtils";
import { DatePredicate } from "./filter";
import { DateGenerator, skipSubDayGenerators } from "./generators";

export const rRuleIterator = (
  dtStart: Date,
  tzid: string,
  condition: DatePredicate,
  instanceGenerator: DateGenerator,
  yearGenerator: DateGenerator,
  monthGenerator: DateGenerator,
  dayGenerator: DateGenerator,
  hourGenerator: DateGenerator,
  minuteGenerator: DateGenerator,
  secondGenerator: DateGenerator,
): DateRecurrenceIterator => {
  let initWorkLimit = 1000;
  let done = false;
  let pendingUtc: Date | undefined;
  const lastUtc_ = new Date(1, 1, 1);

  /*
   * Initialize the builder and skip over any extraneous start instances.
   */
  const builder = DateTimeBuilder.fromDate(dtStart);

  const generateInstance = (): Date | undefined => {
    try {
      do {
        if (!instanceGenerator(builder)) {
          return undefined;
        }

        // const dUtc = dtStart instanceof TimeValue ? TimeUtils.toUtc(builder.toDateTime(), tzid) : builder.toDate();
        const dUtc = builder.date;
        if (dUtc > lastUtc_) {
          return dUtc;
        }
        // eslint-disable-next-line no-constant-condition
      } while (true);
    } catch (e) {
      return undefined;
    }
  };

  /*
   * Apply the generators from largest field to smallest so we can start
   * by applying the smallest field iterator when asked to generate a
   * date.
   */
  try {
    let toInitialize: DateGenerator[];
    if (skipSubDayGenerators(hourGenerator, minuteGenerator, secondGenerator)) {
      toInitialize = [yearGenerator, monthGenerator];
      builder.hours = hourGenerator.value!;
      builder.minutes = minuteGenerator.value!;
      builder.seconds = secondGenerator.value!;
    } else {
      toInitialize = [
        yearGenerator,
        monthGenerator,
        dayGenerator,
        hourGenerator,
        minuteGenerator,
      ];
    }
    for (let i = 0; i !== toInitialize.length; ) {
      if (toInitialize[i](builder)) {
        i += 1;
      } else {
        i -= 1;
        if (i - 1 < 0) {
          // no years left
          done = true;
          break;
        }
      }

      initWorkLimit -= 1;
      if (initWorkLimit === 0) {
        done = true;
        break;
      }
    }
  } catch (e) {
    done = true;
  }

  while (!done) {
    pendingUtc = generateInstance();
    if (!pendingUtc) {
      done = true;
      break;
    }

    // if (pendingUtc.compareTo(TimeUtils.toUtc(dtStart, tzid)) >= 0) {
    if (pendingUtc >= dtStart) {
      /*
       * We only apply the condition to the ones past dtStart to avoid
       * counting useless instances.
       */
      if (!condition(pendingUtc)) {
        done = true;
        pendingUtc = undefined;
      }
      break;
    }

    initWorkLimit -= 1;
    if (initWorkLimit === 0) {
      done = true;
      break;
    }
  }

  const fetchNext = () => {
    if (!!pendingUtc || done) {
      return;
    }

    const dUtc = generateInstance();

    // check the exit condition
    if (!dUtc || !condition(dUtc)) {
      done = true;
      return;
    }

    pendingUtc = dUtc;
    yearGenerator!.workDone!();
  };

  const hasNext = () => {
    if (!pendingUtc) {
      fetchNext();
    }
    return !!pendingUtc;
  };

  const next = () => {
    if (!pendingUtc) {
      fetchNext();
    }
    const next = pendingUtc;
    pendingUtc = undefined;
    return next;
  };

  return {
    next,
    hasNext,
  };
};
