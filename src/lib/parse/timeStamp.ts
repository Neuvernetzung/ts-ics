import {
  type DateObject,
  type DateObjectType,
  zDateObject,
} from "@/types/date";

import { icsDateTimeToDateTime, icsDateToDate } from "./date";

export const icsTimeStampToObject = (
  timestamp: string,
  options?: Record<string, string>
): DateObject => ({
  date:
    options?.VALUE === "DATE"
      ? icsDateToDate(timestamp)
      : icsDateTimeToDateTime(timestamp),
  type: options?.VALUE as DateObjectType,
  timezone: options?.TZID,
});

export const parseicsTimeStamp = (
  timestamp: string,
  options?: Record<string, string>
): DateObject => zDateObject.parse(icsTimeStampToObject(timestamp, options));
