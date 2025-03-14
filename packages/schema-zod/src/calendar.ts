import { z } from "zod";
import {
  calendarMethods,
  calendarVersions,
  convertIcsCalendar,
  type ParseCalendar,
  type IcsCalendar,
  type NonStandardValuesGeneric,
} from "ts-ics";
import { zIcsTimezone } from "./timezone";
import { zIcsEvent } from "./event";

export const zIcsCalenderVersion = z.enum(calendarVersions);

export const zIcsCalendarMethod = z.union([
  z.enum(calendarMethods),
  z.string(),
]);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsCalendar: z.ZodType<IcsCalendar<any>> = z.object({
  version: zIcsCalenderVersion,
  prodId: z.string(),
  method: zIcsCalendarMethod.optional(),
  timezones: z.array(zIcsTimezone).optional(),
  events: z.array(zIcsEvent).optional(),
  name: z.string().optional(),
  nonStandard: z.record(z.any()).optional(),
});

export const parseIcsCalendar = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseCalendar<T>>
): ReturnType<ParseCalendar<T>> => convertIcsCalendar(zIcsCalendar, ...props);
