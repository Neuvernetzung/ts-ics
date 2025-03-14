import type { ConvertTrigger, IcsTriggerRelation, IcsTrigger } from "@/types";

import { convertIcsDuration } from "./duration";
import { convertIcsTimeStamp } from "./timeStamp";
import { standardValidate } from "./utils/standardValidate";

export const convertIcsTrigger: ConvertTrigger = (schema, line, options) => {
  const trigger: IcsTrigger =
    line.options?.VALUE === "DATE-TIME" || line.options?.VALUE === "DATE"
      ? {
          type: "absolute",
          value: convertIcsTimeStamp(undefined, line, options),
          options: { related: line.options?.RELATED as IcsTriggerRelation },
        }
      : {
          type: "relative",
          value: convertIcsDuration(undefined, line),
          options: { related: line.options?.RELATED as IcsTriggerRelation },
        };

  return standardValidate(schema, trigger);
};
