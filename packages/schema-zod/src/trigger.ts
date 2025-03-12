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
import { zIcsDateObject } from "./date";
import { zIcsDuration } from "./duration";

export const zIcsTriggerUnion: z.ZodType<IcsTriggerUnion> =
  z.discriminatedUnion("type", [
    z.object({ type: z.literal("absolute"), value: zIcsDateObject }),
    z.object({ type: z.literal("relative"), value: zIcsDuration }),
  ]);

export const zIcsTriggerOptions: z.ZodType<IcsTriggerOptions> = z.object({
  related: z.enum(triggerRelations).optional(),
});

export const zIcsTriggerBase: z.ZodType<IcsTriggerBase> = z.object({
  options: zIcsTriggerOptions.optional(),
});

export const zIcsTrigger: z.ZodType<IcsTrigger> = z.intersection(
  zIcsTriggerBase,
  zIcsTriggerUnion
);

export const parseIcsTrigger: ParseTrigger = (...props) =>
  convertIcsTrigger(zIcsTrigger, ...props);
