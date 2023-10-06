export const VTIMEZONE_PROP_KEYS = [
  "DTSTART",
  "TZOFFSETTO",
  "TZOFFSETFROM",
  "RRULE",
  "COMMENT",
  "RDATE",
  "TZNAME",
] as const;
export type VTimezonePropKeys = typeof VTIMEZONE_PROP_KEYS;
export type VTimezonePropKey = VTimezonePropKeys[number];

export const VTIMEZONE_PROP_OBJECT_KEYS = [
  "start",
  "offsetTo",
  "offsetFrom",
  "recurrenceRule",
  "comment",
  "recurrenceDate",
  "name",
] as const;

export type VTimezonePropObjectKeys = typeof VTIMEZONE_PROP_OBJECT_KEYS;
export type VTimezonePropObjectKey = VTimezonePropObjectKeys[number];

export const VTIMEZONE_PROP_TO_OBJECT_KEYS: Record<
  VTimezonePropKey,
  VTimezonePropObjectKey
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
  VTimezonePropObjectKey,
  VTimezonePropKey
> = {
  comment: "COMMENT",
  name: "TZNAME",
  offsetFrom: "TZOFFSETFROM",
  offsetTo: "TZOFFSETTO",
  recurrenceDate: "RDATE",
  recurrenceRule: "RRULE",
  start: "DTSTART",
};
