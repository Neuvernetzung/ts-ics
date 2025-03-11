import {
  DateObject,
  dateObjectTypes,
  icsDateTimeToDateTime,
  icsDateToDate,
  Line,
  ParseDate,
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

export const parseIcsDate: ParseDate = (line) => icsDateToDate(line, z.date());

export const parseIcsDateTime: ParseDate = (line) =>
  icsDateTimeToDateTime(line, z.date());
