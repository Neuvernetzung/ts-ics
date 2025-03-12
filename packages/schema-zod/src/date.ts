import {
  type DateObject,
  dateObjectTypes,
  convertIcsDateTime,
  convertIcsDate,
  type ParseDate,
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

export const parseIcsDate: ParseDate = (...props) =>
  convertIcsDate(z.date(), ...props);

export const parseIcsDateTime: ParseDate = (...props) =>
  convertIcsDateTime(z.date(), ...props);
