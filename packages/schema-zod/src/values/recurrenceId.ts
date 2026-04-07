import {
	convertIcsRecurrenceId,
	type IcsRecurrenceId,
	type ParseRecurrenceId,
} from "ts-ics";
import * as z from "zod";
import { zIcsDateObject } from "./date";

export const zIcsRecurrenceId: z.ZodType<IcsRecurrenceId, IcsRecurrenceId> =
	z.object({
		range: z.literal("THISANDFUTURE").optional(),
		value: zIcsDateObject,
	});

export const parseIcsRecurrenceId: ParseRecurrenceId = (...props) =>
	convertIcsRecurrenceId(zIcsRecurrenceId, ...props);
