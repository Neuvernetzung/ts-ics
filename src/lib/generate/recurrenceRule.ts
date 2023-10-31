import compact from "lodash/compact";

import { VEventRecurrenceRule } from "@/types";

import { generateIcsLine } from "./utils/addLine";
import { generateIcsOptions } from "./utils/generateOptions";
import { generateIcsWeekdayNumber } from "./weekdayNumber";

export const generateIcsRecurrenceRule = (value: VEventRecurrenceRule) => {
  let icsString = "";

  const options = generateIcsOptions(
    compact([
      value.byDay && {
        key: "BYDAY",
        value: value.byDay.map((v) => generateIcsWeekdayNumber(v)).join(","),
      },
      value.byHour && { key: "BYHOUR", value: value.byHour.join(",") },
      value.byMinute && { key: "BYMINUTE", value: value.byMinute.join(",") },
      value.byMonth && { key: "BYMONTH", value: value.byMonth.join(",") },
      value.byMonthday && {
        key: "BYMONTHDAY",
        value: value.byMonthday.join(","),
      },
      value.bySecond && { key: "BYSECOND", value: value.bySecond.join(",") },
      value.bySetPos && { key: "BYSETPOS", value: value.bySetPos.join(",") },
      value.byWeekNo && { key: "BYWEEKNO", value: value.byWeekNo.join(",") },
      value.byYearday && { key: "BYYEARDAY", value: value.byYearday.join(",") },
      value.count && { key: "COUNT", value: value.count.toString() },
      value.frequency && { key: "FREQ", value: value.frequency },
      value.interval && { key: "INTERVAL", value: value.interval.toString() },
      value.until && {
        key: "UNTIL",
        value: `${
          value.until.local &&
          `${generateIcsOptions(
            compact([
              {
                key: "TZID",
                value: value.until.local.timezone,
              },
            ]),
          )}=`
        }${value.until.date}`,
      },
      value.workweekStart && { key: "WKST", value: value.workweekStart },
    ]),
  );

  icsString += generateIcsLine("RRULE", options);

  return icsString;
};
