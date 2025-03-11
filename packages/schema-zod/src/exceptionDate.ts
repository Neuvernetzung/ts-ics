import { z } from "zod";
import { zDateObject } from "./date";
import {
  ExceptionDate,
  ExceptionDates,
  icsExceptionDateToObject,
  Line,
  ParseExceptionDates,
} from "ts-ics";

export const zExceptionDate: z.ZodType<ExceptionDate> = zDateObject;

export const zExceptionDates: z.ZodType<ExceptionDates> =
  z.array(zExceptionDate);

export const parseIcsExceptionDate: ParseExceptionDates = (line, options) =>
  icsExceptionDateToObject(line, zExceptionDates, options);
