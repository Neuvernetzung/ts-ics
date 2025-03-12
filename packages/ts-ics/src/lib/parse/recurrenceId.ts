import type { IcsRecurrenceId } from "@/types/recurrenceId";

import { convertIcsTimeStamp } from "./timeStamp";
import type { ConvertRecurrenceId } from "@/types";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsRecurrenceId: ConvertRecurrenceId = (
  schema,
  line,
  options
) =>
  standardValidate(schema, {
    value: convertIcsTimeStamp(undefined, line, options),
    range: line.options?.RANGE as IcsRecurrenceId["range"],
  });
