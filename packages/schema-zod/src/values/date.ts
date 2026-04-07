import {
	convertIcsDate,
	convertIcsDateTime,
	dateObjectTypes,
	type IcsDateObject,
	type ParseDate,
} from "ts-ics";
import * as z from "zod";

export const zIcsDateObjectTzProps = z.object({
	date: z.date(),
	timezone: z.string(),
	tzoffset: z.string(),
});

export const zIcsDateObject: z.ZodType<IcsDateObject, IcsDateObject> = z.object(
	{
		date: z.date(),
		type: z.enum(dateObjectTypes).optional(),
		local: zIcsDateObjectTzProps.optional(),
	},
);

export const parseIcsDate: ParseDate = (...props) =>
	convertIcsDate(z.date(), ...props);

export const parseIcsDateTime: ParseDate = (...props) =>
	convertIcsDateTime(z.date(), ...props);
