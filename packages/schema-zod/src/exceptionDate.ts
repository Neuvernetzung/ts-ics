import { z } from "zod";
import { zDateObject } from "./date";
import {
  type IcsExceptionDate,
  type IcsExceptionDates,
  convertIcsExceptionDates,
  type ParseExceptionDates,
} from "ts-ics";

export const zExceptionDate: z.ZodType<IcsExceptionDate> = zDateObject;

export const zExceptionDates: z.ZodType<IcsExceptionDates> =
  z.array(zExceptionDate);

export const parseIcsExceptionDate: ParseExceptionDates = (...props) =>
  convertIcsExceptionDates(zExceptionDates, ...props);
