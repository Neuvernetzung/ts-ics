import { type DateObject } from "./date";
import { type Duration } from "./duration";
import { LineToObject, ParseLineType } from "./parse";
import { VTimezone } from "./timezone";

export const triggerRelations = ["START", "END"] as const;

export type TriggerRelations = typeof triggerRelations;
export type TriggerRelation = TriggerRelations[number];

export type VEventTriggerUnion =
  | { type: "absolute"; value: DateObject }
  | { type: "relative"; value: Duration };

export type VEventTriggerOptions = { related?: TriggerRelation };

export type VEventTriggerBase = { options?: VEventTriggerOptions };

export type VEventTrigger = VEventTriggerBase & VEventTriggerUnion;

export type ParseTriggerOptions = { timezones?: VTimezone[] };

export type TriggerLineToObject = LineToObject<
  VEventTrigger,
  ParseTriggerOptions
>;

export type ParseTrigger = ParseLineType<VEventTrigger, ParseTriggerOptions>;
