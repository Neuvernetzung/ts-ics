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
import { zIcsTodo } from "./todo";
import { zIcsJournal } from "./journal";
import { zIcsFreeBusy } from "./freebusy";

export const zIcsCalenderVersion = z.enum(calendarVersions);

export const zIcsCalendarMethod = z.union([
  z.enum(calendarMethods),
  z.string(),
]);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const zIcsCalendar: z.ZodType<
  IcsCalendar<any>,
  IcsCalendar<any>
> = z.object({
  version: zIcsCalenderVersion,
  prodId: z.string(),
  method: zIcsCalendarMethod.optional(),
  timezones: z.array(zIcsTimezone).optional(),
  events: z.array(zIcsEvent).optional(),
  todos: z.array(zIcsTodo).optional(),
  journals: z.array(zIcsJournal).optional(),
  freeBusy: z.array(zIcsFreeBusy).optional(),
  name: z.string().optional(),
  nonStandard: z.record(z.string(), z.any()).optional(),
});

export const parseIcsCalendar = <T extends NonStandardValuesGeneric>(
  ...props: Parameters<ParseCalendar<T>>
): ReturnType<ParseCalendar<T>> => convertIcsCalendar(zIcsCalendar, ...props);
