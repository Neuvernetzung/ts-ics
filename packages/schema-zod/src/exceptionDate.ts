import { z } from "zod";
import { zDateObject } from "./date";
import {
  ExceptionDate,
  ExceptionDates,
  icsExceptionDateToObject,
  Line,
} from "ts-ics";

export const zExceptionDate: z.ZodType<ExceptionDate> = zDateObject;

export const zExceptionDates: z.ZodType<ExceptionDates> =
  z.array(zExceptionDate);

export const parseIcsExceptionDate = (line: Line): ExceptionDates =>
  icsExceptionDateToObject(line, zExceptionDates);
