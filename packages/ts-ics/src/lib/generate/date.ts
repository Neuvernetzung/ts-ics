import type { DateObjectType, DateObjectTzProps, IcsTimezone } from "@/types";
import { getTimezoneObjectOffset } from "@/utils";
import { addMilliseconds, getHours, isDate } from "date-fns";

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

  const isoDate = date.toISOString();

  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const d = isoDate.slice(8, 10);
  const hour = isoDate.slice(11, 13);
  const minutes = isoDate.slice(14, 16);
  const seconds = isoDate.slice(17, 19);

  console.log(getHours(date), hour);

  return `${year}${month}${d}T${hour}${minutes}${seconds}Z`;
};

export const generateIcsLocalDateTime = (
  local: DateObjectTzProps,
  timezones?: IcsTimezone[]
): string => {
  const date = local.date;

  if (!isDate(date)) throw Error(`Incorrect date object: ${date}`);

  const utcDate = new Date(date.toISOString());
  console.log("utcDate", utcDate);

  const timezone = getTimezoneObjectOffset(utcDate, local.timezone, timezones);

  const dateWithCorrectedTimeZone = timezone
    ? addMilliseconds(utcDate, timezone.milliseconds)
    : utcDate;

  const isoDate = dateWithCorrectedTimeZone.toISOString();

  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const d = isoDate.slice(8, 10);
  const hour = isoDate.slice(11, 13);
  const minutes = isoDate.slice(14, 16);
  const seconds = isoDate.slice(17, 19);

  return `${year}${month}${d}T${hour}${minutes}${seconds}`;
};
