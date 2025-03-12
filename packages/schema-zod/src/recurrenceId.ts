import {
  convertIcsRecurrenceId,
  type ParseRecurrenceId,
  type RecurrenceId,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";

export const zRecurrenceId: z.ZodType<RecurrenceId> = z.object({
  range: z.literal("THISANDFUTURE").optional(),
  value: zDateObject,
});

export const parseIcsRecurrenceId: ParseRecurrenceId = (...props) =>
  convertIcsRecurrenceId(zRecurrenceId, ...props);
