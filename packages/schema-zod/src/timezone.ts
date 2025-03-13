import {
  convertIcsTimezone,
  type ParseTimezone,
  type IcsTimezone,
  NonStandardValuesGeneric,
} from "ts-ics";
import { z } from "zod";
import { zIcsTimezoneProp } from "./timezoneProp";

export const zIcsTimezone: z.ZodType<IcsTimezone<any>> = z.object({
  id: z.string(),
  lastModified: z.date().optional(),
  url: z.string().url().optional(),
  props: z.array(zIcsTimezoneProp),
  nonStandard: z.record(z.any()),
});

export const parseIcsTimezone = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseTimezone<T>>
): ReturnType<ParseTimezone<T>> => convertIcsTimezone(zIcsTimezone, ...props);
