import { z } from "zod";
import { type DateObject, zDateObject } from "./date";

export type ExceptionDate = DateObject;

export type ExceptionDates = ExceptionDate[];

export const zExceptionDate: z.ZodType<ExceptionDate> = zDateObject;

export const zExceptionDates: z.ZodType<ExceptionDates> =
  z.array(zExceptionDate);
