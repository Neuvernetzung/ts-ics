import { z } from "zod";

import { zDateObject } from "./date";
import { weekDays, zWeekdayNumberObject } from "./weekday";

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

export type VEventRecurrenceRule = z.infer<typeof zVEventRecurrenceRule>;

export const zVEventRecurrenceRule = z.object({
  frequency: z.enum(recurrenceRuleFrequencies),
  until: zDateObject.optional(),
  count: z.number().optional(),
  interval: z.number().optional(),
  bySecond: z.array(z.number().min(0).max(60)).optional(),
  byMinute: z.array(z.number().min(0).max(59)).optional(),
  byHour: z.array(z.number().min(0).max(23)).optional(),
  byDay: z.array(zWeekdayNumberObject).optional(),
  byMonthday: z.array(z.number().min(-31).max(31)).optional(),
  byYearday: z.array(z.number().min(1).max(366)).optional(),
  byWeekNo: z.array(z.number().min(1).max(53)).optional(),
  byMonth: z.array(z.number().min(1).max(12)).optional(),
  bySetPos: z.array(z.number().min(-366).max(366)).optional(),
  workweekStart: z.enum(weekDays).optional(),
});
