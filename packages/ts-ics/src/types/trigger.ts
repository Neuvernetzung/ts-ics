import { type DateObject } from "./date";
import { type VEventDuration } from "./duration";

export const triggerRelations = ["START", "END"] as const;

export type TriggerRelations = typeof triggerRelations;
export type TriggerRelation = TriggerRelations[number];

export type VEventTriggerUnion =
  | { type: "absolute"; value: DateObject }
  | { type: "relative"; value: VEventDuration };

export type VEventTriggerOptions = { related?: TriggerRelation };

export type VEventTriggerBase = { options?: VEventTriggerOptions };

export type VEventTrigger = VEventTriggerBase & VEventTriggerUnion;
