import { type RecurrenceId } from "@/types/recurrenceId";

import { icsTimeStampToObject } from "./timeStamp";
import type { RecurrenceIdLineToObject } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsRecurrenceIdToObject: RecurrenceIdLineToObject = (
  schema,
  line,
  options
) =>
  standardValidate(schema, {
    value: icsTimeStampToObject(undefined, line, options),
    range: line.options?.RANGE as RecurrenceId["range"],
  });
