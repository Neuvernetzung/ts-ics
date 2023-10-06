import { z } from "zod";

import { type DateObject, zDateObject } from "./date";
import { type VEventDuration, zVEventDuration } from "./duration";

export const triggerRelations = ["START", "END"] as const;

export type TriggerRelations = typeof triggerRelations;
export type TriggerRelation = TriggerRelations[number];

export type VEventTriggerUnion =
  | { type: "absolute"; value: DateObject }
  | { type: "relative"; value: VEventDuration };

export const zVEventTriggerUnion: z.ZodType<VEventTriggerUnion> =
  z.discriminatedUnion("type", [
    z.object({ type: z.literal("absolute"), value: zDateObject }),
    z.object({ type: z.literal("relative"), value: zVEventDuration }),
  ]);

export type VEventTriggerOptions = { related?: TriggerRelation };

export const zVEventTriggerOptions: z.ZodType<VEventTriggerOptions> = z.object({
  related: z.enum(triggerRelations).optional(),
});

export type VEventTriggerBase = { options?: VEventTriggerOptions };

export const zVEventTriggerBase: z.ZodType<VEventTriggerBase> = z.object({
  options: zVEventTriggerOptions.optional(),
});

export type VEventTrigger = VEventTriggerBase & VEventTriggerUnion;

export const zVEventTrigger: z.ZodType<VEventTrigger> = z.intersection(
  zVEventTriggerBase,
  zVEventTriggerUnion
);
