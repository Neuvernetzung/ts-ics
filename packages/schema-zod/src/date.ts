import {
  DateObject,
  dateObjectTypes,
  icsDateTimeToDateTime,
  icsDateToDate,
  ParseIcsDateTime,
} from "ts-ics";
import { z } from "zod";

export const zDateObjectTzProps = z.object({
  date: z.date(),
  timezone: z.string(),
  tzoffset: z.string(),
});

export const zDateObject: z.ZodType<DateObject> = z.object({
  date: z.date(),
  type: z.enum(dateObjectTypes).optional(),
  local: zDateObjectTzProps.optional(),
});

export const parseIcsDate = (date: string) =>
  z.date().parse(icsDateToDate(date));

export const parseIcsDateTime: ParseIcsDateTime = (date, timezones): Date =>
  z.date().parse(icsDateTimeToDateTime(date, timezones));
