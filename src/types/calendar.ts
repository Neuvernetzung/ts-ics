import { z } from "zod";
import { zVEvent } from "./event";
import { zVTimezone } from "./timezone";

export const zVCalendarMethods = ["PUBLISH"] as const;

export type VCalendar = z.infer<typeof zVCalendar>;

export const zVCalendar = z.object({
  version: z.literal("2.0"),
  prodId: z.string(),
  method: z.union([z.enum(zVCalendarMethods), z.string()]).optional(),
  timezones: z.array(zVTimezone).optional(),
  events: z.array(zVEvent).optional(),
});
