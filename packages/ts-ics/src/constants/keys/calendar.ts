import { IcsCalendar } from "@/types";

export const VCALENDAR_KEYS = [
  "VERSION",
  "METHOD",
  "PRODID",
  "X-WR-CALNAME",
] as const;
export type IcsCalendarKeys = typeof VCALENDAR_KEYS;
export type IcsCalendarKey = IcsCalendarKeys[number];

export const VCALENDAR_OBJECT_KEYS = [
  "version",
  "method",
  "prodId",
  "name",
] as const satisfies (keyof IcsCalendar)[];

export type IcsCalendarObjectKeys = typeof VCALENDAR_OBJECT_KEYS;
export type IcsCalendarObjectKey = IcsCalendarObjectKeys[number];

export const VCALENDAR_TO_OBJECT_KEYS: Record<
  IcsCalendarKey,
  IcsCalendarObjectKey
> = {
  METHOD: "method",
  PRODID: "prodId",
  VERSION: "version",
  "X-WR-CALNAME": "name",
};

export const VCALENDAR_TO_KEYS: Record<IcsCalendarObjectKey, IcsCalendarKey> = {
  method: "METHOD",
  prodId: "PRODID",
  version: "VERSION",
  name: "X-WR-CALNAME",
};
