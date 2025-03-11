import {
  icsRecurrenceRuleToObject,
  ParseRecurrenceRule,
  RecurrenceRule,
  recurrenceRuleFrequencies,
} from "ts-ics";
import { z } from "zod";
import { zDateObject } from "./date";
import { zWeekDay, zWeekdayNumberObject } from "./weekDay";

export const zRecurrenceRule: z.ZodType<RecurrenceRule> = z.object({
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
  byMonth: z.array(z.number().min(0).max(11)).optional(),
  bySetPos: z.array(z.number().min(-366).max(366)).optional(),
  workweekStart: zWeekDay.optional(),
});

export const parseIcsRecurrenceRule: ParseRecurrenceRule = (
  line,
  recurrenceRuleOptions
) => icsRecurrenceRuleToObject(line, zRecurrenceRule, recurrenceRuleOptions);
