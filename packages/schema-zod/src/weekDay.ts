import {
  icsWeekDayStringToWeekDay,
  type ParseWeekDay,
  type WeekdayNumberObject,
  weekDays,
} from "ts-ics";
import { z } from "zod";

export const zWeekDay = z.enum(weekDays);

export const zWeekdayNumberObject: z.ZodType<WeekdayNumberObject> = z.object({
  day: zWeekDay,
  occurence: z.number().optional(),
});

export const parseIcsWeekDay: ParseWeekDay = (...props) =>
  icsWeekDayStringToWeekDay(zWeekDay, ...props);
