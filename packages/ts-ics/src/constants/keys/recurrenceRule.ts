import { IcsRecurrenceRule } from "@/types";
import { invertKeys, keysFromObject } from "./utils";

export type IcsRecurrenceRuleObjectKey = keyof IcsRecurrenceRule;
export type IcsRecurrenceRuleObjectKeys = IcsRecurrenceRuleObjectKey[];

export const RRULE_TO_KEYS = {
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
} as const satisfies Record<IcsRecurrenceRuleObjectKey, string>;

export const RRULE_TO_OBJECT_KEYS = invertKeys(RRULE_TO_KEYS);

export type IcsRecurrenceRuleKey = keyof typeof RRULE_TO_OBJECT_KEYS;
export type IcsRecurrenceRuleKeys = IcsRecurrenceRuleKey[];

export const RRULE_KEYS = keysFromObject(RRULE_TO_OBJECT_KEYS);

export const RRULE_OBJECT_KEYS = keysFromObject(RRULE_TO_KEYS);
