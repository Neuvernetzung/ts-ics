import { RecurrenceId, zRecurrenceId } from "@/types/recurrenceId";

import { icsTimeStampToObject } from "./timeStamp";

export const icsRecurrenceIdToObject = (
  recurrenceIdString: string,
  options?: Record<string, string>
): RecurrenceId => ({
  value: icsTimeStampToObject(recurrenceIdString, options),
  range: options?.RANGE as RecurrenceId["range"],
});

export const parseIcsRecurrenceId = (
  recurrenceIdString: string,
  options?: Record<string, string>
): RecurrenceId =>
  zRecurrenceId.parse(icsRecurrenceIdToObject(recurrenceIdString, options));
