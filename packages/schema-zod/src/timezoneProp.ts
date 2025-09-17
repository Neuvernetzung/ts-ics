import {
  convertIcsTimezoneProp,
  type IcsTimezoneProp,
  type NonStandardValuesGeneric,
  type ParseTimezoneProp,
  TIMEZONE_PROP_COMPONENTS,
} from "ts-ics";
import { z } from "zod";
import { zIcsRecurrenceRule } from "./recurrenceRule";
import { zIcsDateObject } from "./date";

export const zIcsTimezoneProp: z.ZodType<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsTimezoneProp<any>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsTimezoneProp<any>
> = z.object({
  type: z.enum(TIMEZONE_PROP_COMPONENTS),
  start: z.date(),
  offsetTo: z.string(),
  offsetFrom: z.string(),
  recurrenceRule: zIcsRecurrenceRule.optional(),
  comment: z.string().optional(),
  recurrenceDate: zIcsDateObject.optional(),
  name: z.string().optional(),
  nonStandard: z.record(z.string(), z.any()).optional(),
});

export const parseIcsTimezoneProp = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseTimezoneProp<T>>
): ReturnType<ParseTimezoneProp<T>> =>
  convertIcsTimezoneProp(zIcsTimezoneProp, ...props);
