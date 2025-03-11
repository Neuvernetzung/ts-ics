import { type RecurrenceId } from "@/types/recurrenceId";

import { icsTimeStampToObject } from "./timeStamp";
import type { RecurrenceIdLineToObject } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const icsRecurrenceIdToObject: RecurrenceIdLineToObject = (
  line,
  schema,
  options
) =>
  standardValidate(schema, {
    value: icsTimeStampToObject(line, undefined, options),
    range: line.options?.RANGE as RecurrenceId["range"],
  });
