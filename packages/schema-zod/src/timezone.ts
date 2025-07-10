import {
  convertIcsTimezone,
  type ParseTimezone,
  type IcsTimezone,
  type NonStandardValuesGeneric,
} from "ts-ics";
import { z } from "zod";
import { zIcsTimezoneProp } from "./timezoneProp";

export const zIcsTimezone: z.ZodType<
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsTimezone<any>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  IcsTimezone<any>
> = z.object({
  id: z.string(),
  lastModified: z.date().optional(),
  url: z.url().optional(),
  props: z.array(zIcsTimezoneProp),
  nonStandard: z.record(z.string(), z.any()).optional(),
});

export const parseIcsTimezone = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseTimezone<T>>
): ReturnType<ParseTimezone<T>> => convertIcsTimezone(zIcsTimezone, ...props);
