import {
  type TriggerRelation,
  type VEventTrigger,
  zVEventTrigger,
} from "@/types";

import { icsDurationToObject } from "./duration";
import { icsTimeStampToObject } from "./timeStamp";

export const icsTriggerToObject = (
  value: string,
  options?: Record<string, string>
): VEventTrigger => {
  if (options?.VALUE === "DATE-TIME" || options?.VALUE === "DATE") {
    return {
      type: "absolute",
      value: icsTimeStampToObject(value, options),
      options: { related: options?.RELATED as TriggerRelation },
    };
  }

  return {
    type: "relative",
    value: icsDurationToObject(value),
    options: { related: options?.RELATED as TriggerRelation },
  };
};

export const parseIcsTrigger = (
  value: string,
  options?: Record<string, string>
) => zVEventTrigger.parse(icsTriggerToObject(value, options));
