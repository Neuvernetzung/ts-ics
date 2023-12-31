export const RRULE_KEYS = [
  "FREQ",
  "UNTIL",
  "COUNT",
  "INTERVAL",
  "BYSECOND",
  "BYMINUTE",
  "BYHOUR",
  "BYDAY",
  "BYMONTHDAY",
  "BYYEARDAY",
  "BYWEEKNO",
  "BYMONTH",
  "BYSETPOS",
  "WKST",
] as const;
export type RRuleKeys = typeof RRULE_KEYS;
export type RRuleKey = RRuleKeys[number];

export const RRULE_OBJECT_KEYS = [
  "frequency",
  "until",
  "count",
  "interval",
  "bySecond",
  "byMinute",
  "byHour",
  "byDay",
  "byMonthday",
  "byYearday",
  "byWeekNo",
  "byMonth",
  "bySetPos",
  "workweekStart",
] as const;

export type RRuleObjectKeys = typeof RRULE_OBJECT_KEYS;
export type RRuleObjectKey = RRuleObjectKeys[number];

export const RRULE_TO_OBJECT_KEYS: Record<RRuleKey, RRuleObjectKey> = {
  BYDAY: "byDay",
  BYHOUR: "byHour",
  BYMINUTE: "byMinute",
  BYMONTH: "byMonth",
  BYMONTHDAY: "byMonthday",
  BYSECOND: "bySecond",
  BYSETPOS: "bySetPos",
  BYWEEKNO: "byWeekNo",
  BYYEARDAY: "byYearday",
  COUNT: "count",
  FREQ: "frequency",
  INTERVAL: "interval",
  UNTIL: "until",
  WKST: "workweekStart",
};

export const RRULE_TO_KEYS: Record<RRuleObjectKey, RRuleKey> = {
  byDay: "BYDAY",
  byHour: "BYHOUR",
  byMinute: "BYMINUTE",
  byMonth: "BYMONTH",
  byMonthday: "BYMONTHDAY",
  bySecond: "BYSECOND",
  bySetPos: "BYSETPOS",
  byWeekNo: "BYWEEKNO",
  byYearday: "BYYEARDAY",
  count: "COUNT",
  frequency: "FREQ",
  interval: "INTERVAL",
  until: "UNTIL",
  workweekStart: "WKST",
};
