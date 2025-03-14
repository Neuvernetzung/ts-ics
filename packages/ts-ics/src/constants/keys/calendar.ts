import type { IcsCalendar } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsCalendarObjectKey = Exclude<
  keyof IcsCalendar,
  "events" | "timezones" | "nonStandard"
>;
export type IcsCalendarObjectKeys = IcsCalendarObjectKey[];

export const VCALENDAR_TO_KEYS = {
  method: "METHOD",
  prodId: "PRODID",
  version: "VERSION",
  name: "X-WR-CALNAME",
} as const satisfies Record<IcsCalendarObjectKey, string>;

export const VCALENDAR_TO_OBJECT_KEYS = invertKeys(VCALENDAR_TO_KEYS);

export type IcsCalendarKey = keyof typeof VCALENDAR_TO_OBJECT_KEYS;
export type IcsCalendarKeys = IcsCalendarKey[];

export const VCALENDAR_KEYS = keysFromObject(VCALENDAR_TO_OBJECT_KEYS);

export const VCALENDAR_OBJECT_KEYS = keysFromObject(VCALENDAR_TO_KEYS);
