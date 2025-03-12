import {
  convertIcsTrigger,
  type ParseTrigger,
  triggerRelations,
  type IcsTrigger,
  type IcsTriggerBase,
  type IcsTriggerOptions,
  type IcsTriggerUnion,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";
import { zDuration } from "./duration";

export const zTriggerUnion: z.ZodType<IcsTriggerUnion> = z.discriminatedUnion(
  "type",
  [
    z.object({ type: z.literal("absolute"), value: zDateObject }),
    z.object({ type: z.literal("relative"), value: zDuration }),
  ]
);

export const zTriggerOptions: z.ZodType<IcsTriggerOptions> = z.object({
  related: z.enum(triggerRelations).optional(),
});

export const zTriggerBase: z.ZodType<IcsTriggerBase> = z.object({
  options: zTriggerOptions.optional(),
});

export const zTrigger: z.ZodType<IcsTrigger> = z.intersection(
  zTriggerBase,
  zTriggerUnion
);

export const parseIcsTrigger: ParseTrigger = (...props) =>
  convertIcsTrigger(zTrigger, ...props);
