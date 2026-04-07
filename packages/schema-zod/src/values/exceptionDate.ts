import {
	convertIcsExceptionDates,
	type IcsExceptionDate,
	type IcsExceptionDates,
	type ParseExceptionDates,
} from "ts-ics";
import * as z from "zod";
import { zIcsDateObject } from "./date";

export const zIcsExceptionDate: z.ZodType<IcsExceptionDate, IcsExceptionDate> =
	zIcsDateObject;

export const zIcsExceptionDates: z.ZodType<
	IcsExceptionDates,
	IcsExceptionDates
> = z.array(zIcsExceptionDate);

export const parseIcsExceptionDate: ParseExceptionDates = (...props) =>
	convertIcsExceptionDates(zIcsExceptionDates, ...props);
