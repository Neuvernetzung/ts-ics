import type { DateObject } from "./date";
import type { ConvertLineType, ParseLineType } from "./parse";
import type { VTimezone } from "./timezone";
import type { WeekDay, WeekdayNumberObject } from "./weekday";

export const recurrenceRuleFrequencies = [
  "SECONDLY",
  "MINUTELY",
  "HOURLY",
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
] as const;

export type RecurrenceRuleFrequencies = typeof recurrenceRuleFrequencies;
export type RecurrenceRuleFrequency = RecurrenceRuleFrequencies[number];

export type RecurrenceRule = {
  frequency: RecurrenceRuleFrequency;
  until?: DateObject;
  count?: number;
  interval?: number;
  bySecond?: number[];
  byMinute?: number[];
  byHour?: number[];
  byDay?: WeekdayNumberObject[];
  byMonthday?: number[];
  byYearday?: number[];
  byWeekNo?: number[];
  byMonth?: number[];
  bySetPos?: number[];
  workweekStart?: WeekDay;
};

export type ParseRecurrenceRuleOptions = {
  timezones?: VTimezone[];
};

export type ConvertRecurrenceRule = ConvertLineType<
  RecurrenceRule,
  ParseRecurrenceRuleOptions
>;

export type ParseRecurrenceRule = ParseLineType<
  RecurrenceRule,
  ParseRecurrenceRuleOptions
>;
