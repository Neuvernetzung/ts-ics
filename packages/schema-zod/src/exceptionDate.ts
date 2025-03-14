import { z } from "zod";
import { zIcsDateObject } from "./date";
import {
  type IcsExceptionDate,
  type IcsExceptionDates,
  convertIcsExceptionDates,
  type ParseExceptionDates,
} from "ts-ics";

export const zIcsExceptionDate: z.ZodType<IcsExceptionDate> = zIcsDateObject;

export const zIcsExceptionDates: z.ZodType<IcsExceptionDates> =
  z.array(zIcsExceptionDate);

export const parseIcsExceptionDate: ParseExceptionDates = (...props) =>
  convertIcsExceptionDates(zIcsExceptionDates, ...props);
