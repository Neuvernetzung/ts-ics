import { z } from "zod";

import { type DateObject, zDateObject } from "./date";
import { type VEventRecurrenceRule, zVEventRecurrenceRule } from "./recurrence";

export const timezonePropTypes = ["STANDARD", "DAYLIGHT"] as const;

export type VTimezonePropTypes = typeof timezonePropTypes;
export type VTimezonePropType = VTimezonePropTypes[number];

export type VTimezoneProp = {
  type: VTimezonePropType;
  start: Date;
  offsetTo: string;
  offsetFrom: string;
  recurrenceRule?: VEventRecurrenceRule;
  comment?: string;
  recurrenceDate?: DateObject;
  name?: string;
};

export const zVTimezoneProp: z.ZodType<VTimezoneProp> = z.object({
  type: z.enum(timezonePropTypes),
  start: z.date(),
  offsetTo: z.string(),
  offsetFrom: z.string(),
  recurrenceRule: zVEventRecurrenceRule.optional(),
  comment: z.string().optional(),
  recurrenceDate: zDateObject.optional(),
  name: z.string().optional(),
});

export type VTimezone = {
  id: string;
  lastModified?: Date;
  url?: string;
  props: VTimezoneProp[];
};

export const zVTimezone: z.ZodType<VTimezone> = z.object({
  id: z.string(),
  lastModified: z.date().optional(),
  url: z.string().url().optional(),
  props: z.array(zVTimezoneProp),
});
