import { type RecurrenceId, zRecurrenceId } from "@/types/recurrenceId";

import { icsTimeStampToObject } from "./timeStamp";
import type { VTimezone } from "@/types";

export type ParseIcsRecurrenceId = (
  recurrenceIdString: string,
  options?: Record<string, string>,
  timezones?: VTimezone[]
) => RecurrenceId;

export const icsRecurrenceIdToObject: ParseIcsRecurrenceId = (
  recurrenceIdString,
  options,
  timezones
): RecurrenceId => ({
  value: icsTimeStampToObject(recurrenceIdString, options, timezones),
  range: options?.RANGE as RecurrenceId["range"],
});

export const parseIcsRecurrenceId: ParseIcsRecurrenceId = (
  recurrenceIdString,
  options,
  timezones
) =>
  zRecurrenceId.parse(
    icsRecurrenceIdToObject(recurrenceIdString, options, timezones)
  );
