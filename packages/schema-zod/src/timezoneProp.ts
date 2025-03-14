import {
  convertIcsTimezoneProp,
  type IcsTimezoneProp,
  type NonStandardValuesGeneric,
  type ParseTimezoneProp,
  timezonePropTypes,
} from "ts-ics";
import { z } from "zod";
import { zIcsRecurrenceRule } from "./recurrenceRule";
import { zIcsDateObject } from "./date";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsTimezoneProp: z.ZodType<IcsTimezoneProp<any>> = z.object({
  type: z.enum(timezonePropTypes),
  start: z.date(),
  offsetTo: z.string(),
  offsetFrom: z.string(),
  recurrenceRule: zIcsRecurrenceRule.optional(),
  comment: z.string().optional(),
  recurrenceDate: zIcsDateObject.optional(),
  name: z.string().optional(),
  nonStandard: z.record(z.any()).optional(),
});

export const parseIcsTimezoneProp = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseTimezoneProp<T>>
): ReturnType<ParseTimezoneProp<T>> =>
  convertIcsTimezoneProp(zIcsTimezoneProp, ...props);
