import type { DateObjectTzProps, IcsTimezone } from "@/types";
import { getTimezoneObjectOffset, timeZoneOffsetToMilliseconds } from "@/utils";
import { addMilliseconds, isDate } from "date-fns";

export const generateIcsDate = (date: Date) => {
  if (!isDate(date)) throw Error(`Incorrect date object: ${date}`);

  const isoDate = date.toISOString();

  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const d = isoDate.slice(8, 10);

  return `${year}${month}${d}`;
};

export const generateIcsUtcDateTime = (date: Date) => {
  if (!isDate(date)) throw Error(`Incorrect date object: ${date}`);

  return generateIcsDateTime(date);
};

export const generateIcsLocalDateTime = (
  date: Date,
  local: DateObjectTzProps,
  timezones?: IcsTimezone[]
): string => {
  const localDate = local.date;

  if (!isDate(localDate)) throw Error(`Incorrect date object: ${localDate}`);

  const timezone = getTimezoneObjectOffset(
    localDate,
    local.timezone,
    timezones
  );

  if (!timezone) {
    return generateIcsUtcDateTime(date);
  }

  return generateIcsDateTime(localDate, true);
};

const generateIcsDateTime = (date: Date, isLocal?: boolean): string => {
  const isoDate = date.toISOString();

  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const d = isoDate.slice(8, 10);
  const hour = isoDate.slice(11, 13);
  const minutes = isoDate.slice(14, 16);
  const seconds = isoDate.slice(17, 19);

  return `${year}${month}${d}T${hour}${minutes}${seconds}${isLocal ? "" : "Z"}`;
};

export const generateIcsLocalOnlyDateTime = (date: Date, offset: string) => {
  const offsetMs = timeZoneOffsetToMilliseconds(offset);
  const offsetDate = addMilliseconds(date, offsetMs);

  return generateIcsDateTime(offsetDate, true);
};
