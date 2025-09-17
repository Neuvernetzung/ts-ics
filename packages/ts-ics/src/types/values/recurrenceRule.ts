import type { IcsDateObject } from "./date";
import type { ConvertLineType, ParseLineType } from "../parse";
import type { IcsTimezone } from "../components/timezone";
import type { IcsWeekDay, IcsWeekdayNumber } from "./weekday";

export const recurrenceRuleFrequencies = [
  "SECONDLY",
  "MINUTELY",
  "HOURLY",
  "DAILY",
  "WEEKLY",
  "MONTHLY",
  "YEARLY",
] as const;

export type IcsRecurrenceRuleFrequencies = typeof recurrenceRuleFrequencies;
export type IcsRecurrenceRuleFrequency = IcsRecurrenceRuleFrequencies[number];

export type IcsRecurrenceRule = {
  frequency: IcsRecurrenceRuleFrequency;
  until?: IcsDateObject;
  count?: number;
  interval?: number;
  bySecond?: number[];
  byMinute?: number[];
  byHour?: number[];
  byDay?: IcsWeekdayNumber[];
  byMonthday?: number[];
  byYearday?: number[];
  byWeekNo?: number[];
  byMonth?: number[];
  bySetPos?: number[];
  workweekStart?: IcsWeekDay;
};

export type ParseRecurrenceRuleOptions = {
  timezones?: IcsTimezone[];
};

export type ConvertRecurrenceRule = ConvertLineType<
  IcsRecurrenceRule,
  ParseRecurrenceRuleOptions
>;

export type ParseRecurrenceRule = ParseLineType<
  IcsRecurrenceRule,
  ParseRecurrenceRuleOptions
>;
