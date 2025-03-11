import {
  icsRecurrenceIdToObject,
  ParseIcsRecurrenceId,
  RecurrenceId,
  VTimezone,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";

export const zRecurrenceId: z.ZodType<RecurrenceId> = z.object({
  range: z.literal("THISANDFUTURE").optional(),
  value: zDateObject,
});

export const parseIcsRecurrenceId = (
  recurrenceIdString: string,
  options: Record<string, string>,
  timezones?: VTimezone[]
) =>
  icsRecurrenceIdToObject(
    recurrenceIdString,
    zRecurrenceId,
    options,
    timezones
  );
