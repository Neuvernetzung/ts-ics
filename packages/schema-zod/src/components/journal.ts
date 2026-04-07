import {
	convertIcsJournal,
	type NonStandardValuesGeneric,
	type IcsJournal,
	type ParseJournal,
} from "ts-ics";
import * as z from "zod";
import { zIcsAttendee } from "../values/attendee";
import { zIcsClassType } from "../values/class";
import { zIcsDateObject } from "../values/date";
import { zIcsExceptionDates } from "../values/exceptionDate";
import { zIcsOrganizer } from "../values/organizer";
import { zIcsRecurrenceId } from "../values/recurrenceId";
import { zIcsRecurrenceRule } from "../values/recurrenceRule";
import { zIcsJournalStatusType } from "../values/status";

export const zIcsJournal: z.ZodType<
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	IcsJournal<any>,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	IcsJournal<any>
> = z.object({
	summary: z.string().optional(),
	uid: z.string(),
	created: zIcsDateObject.optional(),
	lastModified: zIcsDateObject.optional(),
	completed: zIcsDateObject.optional(),
	start: zIcsDateObject.optional(),
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
	status: zIcsJournalStatusType.optional(),
	attach: z.string().optional(),
	recurrenceId: zIcsRecurrenceId.optional(),
	attendees: z.array(zIcsAttendee).optional(),
	comment: z.string().optional(),
	nonStandard: z.record(z.string(), z.any()).optional(),
	percentComplete: z.number().int().optional(),
});

export const parseIcsJournal = <T extends NonStandardValuesGeneric>(
	...props: Parameters<ParseJournal<T>>
): ReturnType<ParseJournal<T>> => convertIcsJournal(zIcsJournal, ...props);
