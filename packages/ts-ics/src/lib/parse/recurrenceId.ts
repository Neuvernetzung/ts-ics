import { type RecurrenceId } from "@/types/recurrenceId";

import { icsTimeStampToObject } from "./timeStamp";
import type { Line, VTimezone } from "@/types";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export type ParseRecurrenceIdOptions = { timezones?: VTimezone[] };

export const icsRecurrenceIdToObject = (
  line: Line,
  schema: StandardSchemaV1<RecurrenceId> | undefined,
  options?: ParseRecurrenceIdOptions
): RecurrenceId =>
  standardValidate(schema, {
    value: icsTimeStampToObject(line, undefined, options),
    range: line.options?.RANGE as RecurrenceId["range"],
  });
