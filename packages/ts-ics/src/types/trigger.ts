import type { IcsDateObject } from "./date";
import type { IcsDuration } from "./duration";
import type { ConvertLineType, ParseLineType } from "./parse";
import type { IcsTimezone } from "./timezone";

export const triggerRelations = ["START", "END"] as const;

export type IcsTriggerRelations = typeof triggerRelations;
export type IcsTriggerRelation = IcsTriggerRelations[number];

export type IcsTriggerUnion =
  | { type: "absolute"; value: IcsDateObject }
  | { type: "relative"; value: IcsDuration };

export type IcsTriggerOptions = { related?: IcsTriggerRelation };

export type IcsTriggerBase = { options?: IcsTriggerOptions };

export type IcsTrigger = IcsTriggerBase & IcsTriggerUnion;

export type ParseTriggerOptions = { timezones?: IcsTimezone[] };

export type ConvertTrigger = ConvertLineType<IcsTrigger, ParseTriggerOptions>;

export type ParseTrigger = ParseLineType<IcsTrigger, ParseTriggerOptions>;
