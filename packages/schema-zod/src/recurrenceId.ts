import {
  icsRecurrenceIdToObject,
  ParseIcsRecurrenceId,
  RecurrenceId,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";

export const zRecurrenceId: z.ZodType<RecurrenceId> = z.object({
  range: z.literal("THISANDFUTURE").optional(),
  value: zDateObject,
});

export const parseIcsRecurrenceId: ParseIcsRecurrenceId = (
  recurrenceIdString,
  options,
  timezones
) =>
  zRecurrenceId.parse(
    icsRecurrenceIdToObject(recurrenceIdString, options, timezones)
  );
