import {
	convertIcsTodo,
	type NonStandardValuesGeneric,
	type IcsTodo,
	type IcsTodoBase,
	type IcsTodoDurationOrDue,
	type ParseTodo,
} from "ts-ics";
import * as z from "zod";
import { zIcsAttendee } from "../values/attendee";
import { zIcsClassType } from "../values/class";
import { zIcsDateObject } from "../values/date";
import { zIcsDuration } from "../values/duration";
import { zIcsExceptionDates } from "../values/exceptionDate";
import { zIcsOrganizer } from "../values/organizer";
import { zIcsRecurrenceId } from "../values/recurrenceId";
import { zIcsRecurrenceRule } from "../values/recurrenceRule";
import { zIcsTodoStatusType } from "../values/status";

export const zIcsDurationOrDue: z.ZodType<
	IcsTodoDurationOrDue,
	IcsTodoDurationOrDue
> = z.union([
	z.object({
		duration: zIcsDuration,
		start: zIcsDateObject,
		due: z.never().nullish(),
	}),
	z.object({ duration: z.never().nullish(), due: zIcsDateObject }),
]);

export const zIcsTodoBase: z.ZodType<IcsTodoBase, IcsTodoBase> = z.object({
	summary: z.string().optional(),
	uid: z.string(),
	created: zIcsDateObject.optional(),
	lastModified: zIcsDateObject.optional(),
	completed: zIcsDateObject.optional(),
	stamp: zIcsDateObject,
	location: z.string().optional(),
	description: z.string().optional(),
	categories: z.array(z.string()).optional(),
	exceptionDates: zIcsExceptionDates.optional(),
	recurrenceRule: zIcsRecurrenceRule.optional(),
	url: z.url().optional(),
	geo: z.string().optional(),
	class: zIcsClassType.optional(),
	organizer: zIcsOrganizer.optional(),
	priority: z.string().optional(),
	sequence: z.number().int().optional(),
	status: zIcsTodoStatusType.optional(),
	attach: z.string().optional(),
	recurrenceId: zIcsRecurrenceId.optional(),
	attendees: z.array(zIcsAttendee).optional(),
	comment: z.string().optional(),
	nonStandard: z.record(z.string(), z.any()).optional(),
	percentComplete: z.number().int().optional(),
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsTodo: z.ZodType<IcsTodo<any>, IcsTodo<any>> = z.intersection(
	zIcsTodoBase,
	zIcsDurationOrDue,
);

export const parseIcsTodo = <T extends NonStandardValuesGeneric>(
	...props: Parameters<ParseTodo<T>>
): ReturnType<ParseTodo<T>> => convertIcsTodo(zIcsTodo, ...props);
