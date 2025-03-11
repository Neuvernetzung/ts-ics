import { DateObject, icsTimeStampToObject, ParseIcsTimeStamp } from "ts-ics";
import { zDateObject } from "./date";

export const parseicsTimeStamp: ParseIcsTimeStamp = (
  timestamp,
  options,
  timezones
): DateObject =>
  zDateObject.parse(icsTimeStampToObject(timestamp, options, timezones));
