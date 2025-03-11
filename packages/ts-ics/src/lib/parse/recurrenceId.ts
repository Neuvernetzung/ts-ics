import { type RecurrenceId } from "@/types/recurrenceId";

import { icsTimeStampToObject } from "./timeStamp";
import type { VTimezone } from "@/types";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export type ParseIcsRecurrenceId = (
  recurrenceIdString: string,
  schema?: StandardSchemaV1<RecurrenceId>,
  options?: Record<string, string>,
  timezones?: VTimezone[]
) => RecurrenceId;

export const icsRecurrenceIdToObject: ParseIcsRecurrenceId = (
  recurrenceIdString,
  schema,
  options,
  timezones
): RecurrenceId =>
  standardValidate(schema, {
    value: icsTimeStampToObject(recurrenceIdString, options, timezones),
    range: options?.RANGE as RecurrenceId["range"],
  });
