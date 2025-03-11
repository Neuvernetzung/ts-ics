import { z } from "zod";
import {
  calendarMethods,
  calendarVersions,
  icsCalendarToObject,
  VCalendar,
} from "ts-ics";
import { zVTimezone } from "./timezone";
import { zVEvent } from "./event";

export const zVCalenderVersion = z.enum(calendarVersions);

export const zVCalendarMethod = z.union([z.enum(calendarMethods), z.string()]);

export const zVCalendar: z.ZodType<VCalendar> = z.object({
  version: zVCalenderVersion,
  prodId: z.string(),
  method: zVCalendarMethod.optional(),
  timezones: z.array(zVTimezone).optional(),
  events: z.array(zVEvent).optional(),
  name: z.string().optional(),
});

export const parseIcsCalendar = (calendarString: string): VCalendar =>
  icsCalendarToObject(calendarString, zVCalendar);
