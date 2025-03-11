import { z } from "zod";
import { zDateObject } from "./date";
import {
  ExceptionDate,
  ExceptionDates,
  icsExceptionDateToObject,
} from "ts-ics";

export const zExceptionDate: z.ZodType<ExceptionDate> = zDateObject;

export const zExceptionDates: z.ZodType<ExceptionDates> =
  z.array(zExceptionDate);

export const parseIcsExceptionDate = (
  exceptionDateString: string,
  options?: Record<string, string>
): ExceptionDates =>
  zExceptionDates.parse(icsExceptionDateToObject(exceptionDateString, options));
