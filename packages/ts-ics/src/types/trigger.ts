import type { DateObject } from "./date";
import type { Duration } from "./duration";
import type { ConvertLineType, ParseLineType } from "./parse";
import type { VTimezone } from "./timezone";

export const triggerRelations = ["START", "END"] as const;

export type TriggerRelations = typeof triggerRelations;
export type TriggerRelation = TriggerRelations[number];

export type TriggerUnion =
  | { type: "absolute"; value: DateObject }
  | { type: "relative"; value: Duration };

export type TriggerOptions = { related?: TriggerRelation };

export type TriggerBase = { options?: TriggerOptions };

export type Trigger = TriggerBase & TriggerUnion;

export type ParseTriggerOptions = { timezones?: VTimezone[] };

export type ConvertTrigger = ConvertLineType<Trigger, ParseTriggerOptions>;

export type ParseTrigger = ParseLineType<Trigger, ParseTriggerOptions>;
