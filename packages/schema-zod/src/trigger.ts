import {
  convertIcsTrigger,
  type ParseTrigger,
  triggerRelations,
  type Trigger,
  type TriggerBase,
  type TriggerOptions,
  type TriggerUnion,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";
import { zDuration } from "./duration";

export const zTriggerUnion: z.ZodType<TriggerUnion> = z.discriminatedUnion(
  "type",
  [
    z.object({ type: z.literal("absolute"), value: zDateObject }),
    z.object({ type: z.literal("relative"), value: zDuration }),
  ]
);

export const zTriggerOptions: z.ZodType<TriggerOptions> = z.object({
  related: z.enum(triggerRelations).optional(),
});

export const zTriggerBase: z.ZodType<TriggerBase> = z.object({
  options: zTriggerOptions.optional(),
});

export const zTrigger: z.ZodType<Trigger> = z.intersection(
  zTriggerBase,
  zTriggerUnion
);

export const parseIcsTrigger: ParseTrigger = (...props) =>
  convertIcsTrigger(zTrigger, ...props);
