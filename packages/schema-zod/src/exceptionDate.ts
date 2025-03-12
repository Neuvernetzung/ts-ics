import { z } from "zod";
import { zDateObject } from "./date";
import {
  type ExceptionDate,
  type ExceptionDates,
  icsExceptionDateToObject,
  type ParseExceptionDates,
} from "ts-ics";

export const zExceptionDate: z.ZodType<ExceptionDate> = zDateObject;

export const zExceptionDates: z.ZodType<ExceptionDates> =
  z.array(zExceptionDate);

export const parseIcsExceptionDate: ParseExceptionDates = (...props) =>
  icsExceptionDateToObject(zExceptionDates, ...props);
