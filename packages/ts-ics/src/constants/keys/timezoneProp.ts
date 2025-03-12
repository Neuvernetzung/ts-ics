import { IcsTimezoneProp } from "@/types";

export const VTIMEZONE_PROP_KEYS = [
  "DTSTART",
  "TZOFFSETTO",
  "TZOFFSETFROM",
  "RRULE",
  "COMMENT",
  "RDATE",
  "TZNAME",
] as const;
export type IcsTimezonePropKeys = typeof VTIMEZONE_PROP_KEYS;
export type IcsTimezonePropKey = IcsTimezonePropKeys[number];

export const VTIMEZONE_PROP_OBJECT_KEYS = [
  "start",
  "offsetTo",
  "offsetFrom",
  "recurrenceRule",
  "comment",
  "recurrenceDate",
  "name",
] as const satisfies (keyof IcsTimezoneProp)[];

export type IcsTimezonePropObjectKeys = typeof VTIMEZONE_PROP_OBJECT_KEYS;
export type IcsTimezonePropObjectKey = IcsTimezonePropObjectKeys[number];

export const VTIMEZONE_PROP_TO_OBJECT_KEYS: Record<
  IcsTimezonePropKey,
  IcsTimezonePropObjectKey
> = {
  COMMENT: "comment",
  DTSTART: "start",
  RDATE: "recurrenceDate",
  RRULE: "recurrenceRule",
  TZNAME: "name",
  TZOFFSETFROM: "offsetFrom",
  TZOFFSETTO: "offsetTo",
};

export const VTIMEZONE_PROP_TO_KEYS: Record<
  IcsTimezonePropObjectKey,
  IcsTimezonePropKey
> = {
  comment: "COMMENT",
  name: "TZNAME",
  offsetFrom: "TZOFFSETFROM",
  offsetTo: "TZOFFSETTO",
  recurrenceDate: "RDATE",
  recurrenceRule: "RRULE",
  start: "DTSTART",
};
