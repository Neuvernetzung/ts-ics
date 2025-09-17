import { addMilliseconds } from "date-fns";

import type { Line, ParseTimeStampOptions, ConvertTimeStamp } from "@/types";
import type { DateObjectType } from "@/types/values/date";

import { convertIcsDateTime, convertIcsDate } from "./date";
import { getTimezoneObjectOffset } from "@/utils/timezone/getTimezone";
import { standardValidate } from "../utils/standardValidate";

const __convertIcsTimeStamp = (line: Line, options?: ParseTimeStampOptions) => {
  if (line.options?.VALUE === "DATE")
    return {
      date: convertIcsDate(undefined, line),
      type: line.options?.VALUE as DateObjectType,
    };

  const type: DateObjectType =
    (line.options?.VALUE as DateObjectType) || "DATE-TIME";

  const dateTime = convertIcsDateTime(undefined, line);

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

export const convertIcsTimeStamp: ConvertTimeStamp = (
  schema,
  line,
  options
) => {
  return standardValidate(schema, __convertIcsTimeStamp(line, options));
};
