import {
  type TriggerRelation,
  type VEventTrigger,
  zVEventTrigger,
  VTimezone,
} from "@/types";

import { icsDurationToObject } from "./duration";
import { icsTimeStampToObject } from "./timeStamp";

export type ParseIcsTrigger = (
  value: string,
  options?: Record<string, string>,
  timezones?: VTimezone[]
) => VEventTrigger;

export const icsTriggerToObject: ParseIcsTrigger = (
  value,
  options,
  timezones
) => {
  if (options?.VALUE === "DATE-TIME" || options?.VALUE === "DATE") {
    return {
      type: "absolute",
      value: icsTimeStampToObject(value, options, timezones),
      options: { related: options?.RELATED as TriggerRelation },
    };
  }

  return {
    type: "relative",
    value: icsDurationToObject(value),
    options: { related: options?.RELATED as TriggerRelation },
  };
};

export const parseIcsTrigger: ParseIcsTrigger = (value, options, timezones) =>
  zVEventTrigger.parse(icsTriggerToObject(value, options, timezones));
