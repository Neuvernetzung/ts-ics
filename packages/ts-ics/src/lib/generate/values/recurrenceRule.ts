import type { IcsRecurrenceRule } from "@/types";

import { generateIcsLine } from "../utils/addLine";
import { generateIcsOptions } from "../utils/generateOptions";
import { generateIcsWeekdayNumber } from "../values/weekdayNumber";
import { generateIcsDate, generateIcsUtcDateTime } from "./date";

export const generateIcsRecurrenceRule = (value: IcsRecurrenceRule) => {
  let icsString = "";

  const options = generateIcsOptions(
    [
      value.frequency && { key: "FREQ", value: value.frequency },
      value.byDay && {
        key: "BYDAY",
        value: value.byDay.map((v) => generateIcsWeekdayNumber(v)).join(","),
      },
      value.byHour && { key: "BYHOUR", value: value.byHour.join(",") },
      value.byMinute && { key: "BYMINUTE", value: value.byMinute.join(",") },
      value.byMonth && {
        key: "BYMONTH",
        value: value.byMonth.map((v) => v + 1).join(","), // Javascript Monat fängt bei 0 an, ICS byMonth bei 1
      },
      value.byMonthday && {
        key: "BYMONTHDAY",
        value: value.byMonthday.join(","),
      },
      value.bySecond && { key: "BYSECOND", value: value.bySecond.join(",") },
      value.bySetPos && { key: "BYSETPOS", value: value.bySetPos.join(",") },
      value.byWeekNo && { key: "BYWEEKNO", value: value.byWeekNo.join(",") },
      value.byYearday && { key: "BYYEARDAY", value: value.byYearday.join(",") },
      value.count && { key: "COUNT", value: value.count.toString() },
      value.interval && { key: "INTERVAL", value: value.interval.toString() },
      value.until && {
        key: "UNTIL",
        value:
          value.until.type === "DATE"
            ? generateIcsDate(value.until.date)
            : generateIcsUtcDateTime(
                value.until.local?.date || value.until.date,
              ),
      },
      value.workweekStart && { key: "WKST", value: value.workweekStart },
    ].filter((v) => !!v),
  );

  icsString += generateIcsLine("RRULE", options);

  return icsString;
};
