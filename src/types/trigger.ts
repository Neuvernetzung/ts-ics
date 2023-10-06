import { z } from "zod";

import { zDateObject } from "./date";
import { zVEventDuration } from "./duration";

export const triggerRelations = ["START", "END"] as const;

export type TriggerRelations = typeof triggerRelations;
export type TriggerRelation = TriggerRelations[number];

export type VEventTrigger = z.infer<typeof zVEventTrigger>;

export const zVEventTriggerUnion = z.discriminatedUnion("type", [
  z.object({ type: z.literal("absolute"), value: zDateObject }),
  z.object({ type: z.literal("relative"), value: zVEventDuration }),
]);

export const zVEventTriggerBase = z.object({
  options: z
    .object({
      related: z.enum(triggerRelations).optional(),
    })
    .optional(),
});

export const zVEventTrigger = z.intersection(
  zVEventTriggerBase,
  zVEventTriggerUnion
);
