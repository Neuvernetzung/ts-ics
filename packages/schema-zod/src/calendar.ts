import { z } from "zod";
import {
  calendarMethods,
  calendarVersions,
  convertIcsCalendar,
  type ParseCalendar,
  type IcsCalendar,
} from "ts-ics";
import { zIcsTimezone } from "./timezone";
import { zIcsEvent } from "./event";

export const zIcsCalenderVersion = z.enum(calendarVersions);

export const zIcsCalendarMethod = z.union([
  z.enum(calendarMethods),
  z.string(),
]);

export const zIcsCalendar: z.ZodType<IcsCalendar> = z.object({
  version: zIcsCalenderVersion,
  prodId: z.string(),
  method: zIcsCalendarMethod.optional(),
  timezones: z.array(zIcsTimezone).optional(),
  events: z.array(zIcsEvent).optional(),
  name: z.string().optional(),
});

export const parseIcsCalendar: ParseCalendar = (...props) =>
  convertIcsCalendar(zIcsCalendar, ...props);
