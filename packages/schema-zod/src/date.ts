import {
  DateObject,
  dateObjectTypes,
  icsDateTimeToDateTime,
  icsDateToDate,
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

export const parseIcsDateTime = (date: string): Date =>
  icsDateTimeToDateTime(date, z.date());
