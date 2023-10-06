import { z } from "zod";
import { zVEventRecurrenceRule } from "./recurrence";
import { zDateObject } from "./date";

export const timezonePropTypes = ["STANDARD", "DAYLIGHT"] as const;

export type VTimezonePropTypes = typeof timezonePropTypes;
export type VTimezonePropType = VTimezonePropTypes[number];

export type VTimezoneProp = z.infer<typeof zVTimezoneProp>;

export const zVTimezoneProp = z.object({
  type: z.enum(["STANDARD", "DAYLIGHT"]).default("STANDARD"),
  start: z.date(),
  offsetTo: z.string(),
  offsetFrom: z.string(),
  recurrenceRule: zVEventRecurrenceRule.optional(),
  comment: z.string().optional(),
  recurrenceDate: zDateObject.optional(),
  name: z.string().optional(),
});

export type VTimezone = z.infer<typeof zVTimezone>;

export const zVTimezone = z.object({
  id: z.string(),
  lastModified: z.date().optional(),
  url: z.string().url().optional(),
  props: z.array(zVTimezoneProp),
});
