import type { ConvertTrigger, TriggerRelation, Trigger } from "@/types";

import { convertIcsDuration } from "./duration";
import { convertIcsTimeStamp } from "./timeStamp";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsTrigger: ConvertTrigger = (schema, line, options) => {
  const trigger: Trigger =
    line.options?.VALUE === "DATE-TIME" || line.options?.VALUE === "DATE"
      ? {
          type: "absolute",
          value: convertIcsTimeStamp(undefined, line, options),
          options: { related: line.options?.RELATED as TriggerRelation },
        }
      : {
          type: "relative",
          value: convertIcsDuration(undefined, line),
          options: { related: line.options?.RELATED as TriggerRelation },
        };

  return standardValidate(schema, trigger);
};
