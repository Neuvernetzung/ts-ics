import {
  TriggerLineToObject,
  type TriggerRelation,
  type VEventTrigger,
} from "@/types";

import { icsDurationToObject } from "./duration";
import { icsTimeStampToObject } from "./timeStamp";
import { standardValidate } from "./utils/standardValidate";

export const icsTriggerToObject: TriggerLineToObject = (
  line,
  schema,
  options
) => {
  const trigger: VEventTrigger =
    line.options?.VALUE === "DATE-TIME" || line.options?.VALUE === "DATE"
      ? {
          type: "absolute",
          value: icsTimeStampToObject(line, undefined, options),
          options: { related: line.options?.RELATED as TriggerRelation },
        }
      : {
          type: "relative",
          value: icsDurationToObject(line, undefined),
          options: { related: line.options?.RELATED as TriggerRelation },
        };

  return standardValidate(schema, trigger);
};
