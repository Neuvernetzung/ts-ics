import {
  convertIcsTimezoneProp,
  convertIcsTimezone,
  type ParseTimezone,
  type ParseTimezoneProp,
  timezonePropTypes,
  type IcsTimezone,
  type IcsTimezoneProp,
} from "ts-ics";
import { z } from "zod";
import { zRecurrenceRule } from "./recurrenceRule";
import { zDateObject } from "./date";

export const zIcsTimezoneProp: z.ZodType<IcsTimezoneProp> = z.object({
  type: z.enum(timezonePropTypes),
  start: z.date(),
  offsetTo: z.string(),
  offsetFrom: z.string(),
  recurrenceRule: zRecurrenceRule.optional(),
  comment: z.string().optional(),
  recurrenceDate: zDateObject.optional(),
  name: z.string().optional(),
});

export const parseIcsTimezoneProp: ParseTimezoneProp = (...props) =>
  convertIcsTimezoneProp(zIcsTimezoneProp, ...props);

export const zIcsTimezone: z.ZodType<IcsTimezone> = z.object({
  id: z.string(),
  lastModified: z.date().optional(),
  url: z.string().url().optional(),
  props: z.array(zIcsTimezoneProp),
});

export const parseIcsTimezone: ParseTimezone = (...props) =>
  convertIcsTimezone(zIcsTimezone, ...props);
