import {
  icsRecurrenceIdToObject,
  Line,
  ParseRecurrenceIdOptions,
  RecurrenceId,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";

export const zRecurrenceId: z.ZodType<RecurrenceId> = z.object({
  range: z.literal("THISANDFUTURE").optional(),
  value: zDateObject,
});

export const parseIcsRecurrenceId = (
  line: Line,
  options?: ParseRecurrenceIdOptions
) => icsRecurrenceIdToObject(line, zRecurrenceId, options);
