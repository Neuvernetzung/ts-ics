import { addMilliseconds } from "date-fns";

import { VTimezone } from "@/types";
import {
  type DateObject,
  type DateObjectType,
  zDateObject,
} from "@/types/date";

import { icsDateTimeToDateTime, icsDateToDate } from "./date";
import { getTimezoneObjectOffset } from "./utils/timezone/getTimezone";

export type ParseIcsTimeStamp = (
  timestamp: string,
  options?: Record<string, string>,
  timezones?: VTimezone[],
) => DateObject;

export const icsTimeStampToObject: ParseIcsTimeStamp = (
  timestamp,
  options,
  timezones,
) => {
  if (options?.VALUE === "DATE")
    return {
      date: icsDateToDate(timestamp),
      type: options?.VALUE as DateObjectType,
    };

  const type: DateObjectType =
    (options?.VALUE as DateObjectType) || "DATE-TIME";

  const dateTime = icsDateTimeToDateTime(timestamp);

  if (!options?.TZID)
    return {
      date: dateTime,
      type,
    };

  const timezone = getTimezoneObjectOffset(dateTime, options.TZID, timezones);

  if (!timezone)
    return {
      date: dateTime,
      type,
    };

  return {
    date: addMilliseconds(dateTime, -timezone.milliseconds),
    type,
    local: options?.TZID
      ? { date: dateTime, timezone: options?.TZID, tzoffset: timezone.offset }
      : undefined,
  };
};

export const parseicsTimeStamp: ParseIcsTimeStamp = (
  timestamp,
  options,
  timezones,
): DateObject =>
  zDateObject.parse(icsTimeStampToObject(timestamp, options, timezones));
