import { addMilliseconds } from "date-fns";

import type {
  Line,
  ParseTimeStampOptions,
  TimeStampLineToObject,
} from "@/types";
import { type DateObjectType } from "@/types/date";

import { icsDateTimeToDateTime, icsDateToDate } from "./date";
import { getTimezoneObjectOffset } from "@/utils/timezone/getTimezone";
import { standardValidate } from "./utils/standardValidate";

const __icsTimeStampToObject = (
  line: Line,
  options?: ParseTimeStampOptions
) => {
  if (line.options?.VALUE === "DATE")
    return {
      date: icsDateToDate(line, undefined),
      type: line.options?.VALUE as DateObjectType,
    };

  const type: DateObjectType =
    (line.options?.VALUE as DateObjectType) || "DATE-TIME";

  const dateTime = icsDateTimeToDateTime(line, undefined);

  if (!line.options?.TZID)
    return {
      date: dateTime,
      type,
    };

  const timezone = getTimezoneObjectOffset(
    dateTime,
    line.options.TZID,
    options?.timezones
  );

  if (!timezone)
    return {
      date: dateTime,
      type,
    };

  return {
    date: addMilliseconds(dateTime, -timezone.milliseconds),
    type,
    local: line.options?.TZID
      ? {
          date: dateTime,
          timezone: line.options?.TZID,
          tzoffset: timezone.offset,
        }
      : undefined,
  };
};

export const icsTimeStampToObject: TimeStampLineToObject = (
  line,
  schema,
  options
) => {
  return standardValidate(schema, __icsTimeStampToObject(line, options));
};
