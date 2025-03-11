import {
  Line,
  type TriggerRelation,
  type VEventTrigger,
  type VTimezone,
} from "@/types";

import { icsDurationToObject } from "./duration";
import { icsTimeStampToObject } from "./timeStamp";
import { StandardSchemaV1 } from "@standard-schema/spec";
import { standardValidate } from "./utils/standardValidate";

export type ParseTriggerOptions = { timezones?: VTimezone[] };

export const icsTriggerToObject = (
  line: Line,
  schema: StandardSchemaV1<VEventTrigger> | undefined,
  options?: ParseTriggerOptions
): VEventTrigger => {
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
