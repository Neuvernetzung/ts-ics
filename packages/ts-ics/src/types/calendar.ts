import { z } from "zod";

import { type VEvent, zVEvent } from "./event";
import { type VTimezone, zVTimezone } from "./timezone";

export const zVCalendarMethods = ["PUBLISH"] as const;

export type VCalendarMethods = typeof zVCalendarMethods;
export type VCalenderMethod = VCalendarMethods[number];

export type VCalendar = {
  version: "2.0";
  prodId: string;
  method?: VCalenderMethod | string;
  timezones?: VTimezone[];
  events?: VEvent[];
};

export const zVCalendar: z.ZodType<VCalendar> = z.object({
  version: z.literal("2.0"),
  prodId: z.string(),
  method: z.union([z.enum(zVCalendarMethods), z.string()]).optional(),
  timezones: z.array(zVTimezone).optional(),
  events: z.array(zVEvent).optional(),
});
