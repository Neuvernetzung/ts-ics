import {
  convertIcsWeekDay,
  type ParseWeekDay,
  type IcsWeekdayNumber,
  weekDays,
} from "ts-ics";
import { z } from "zod";

export const zWeekDay = z.enum(weekDays);

export const zWeekdayNumberObject: z.ZodType<IcsWeekdayNumber> = z.object({
  day: zWeekDay,
  occurence: z.number().optional(),
});

export const parseIcsWeekDay: ParseWeekDay = (...props) =>
  convertIcsWeekDay(zWeekDay, ...props);
