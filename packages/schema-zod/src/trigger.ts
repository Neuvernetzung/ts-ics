import {
  icsTriggerToObject,
  Line,
  ParseTrigger,
  ParseTriggerOptions,
  triggerRelations,
  VEventTrigger,
  VEventTriggerBase,
  VEventTriggerOptions,
  VEventTriggerUnion,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";
import { zDuration } from "./duration";

export const zVEventTriggerUnion: z.ZodType<VEventTriggerUnion> =
  z.discriminatedUnion("type", [
    z.object({ type: z.literal("absolute"), value: zDateObject }),
    z.object({ type: z.literal("relative"), value: zDuration }),
  ]);

export const zVEventTriggerOptions: z.ZodType<VEventTriggerOptions> = z.object({
  related: z.enum(triggerRelations).optional(),
});

export const zVEventTriggerBase: z.ZodType<VEventTriggerBase> = z.object({
  options: zVEventTriggerOptions.optional(),
});

export const zVEventTrigger: z.ZodType<VEventTrigger> = z.intersection(
  zVEventTriggerBase,
  zVEventTriggerUnion
);

export const parseIcsTrigger: ParseTrigger = (...props) =>
  icsTriggerToObject(zVEventTrigger, ...props);
