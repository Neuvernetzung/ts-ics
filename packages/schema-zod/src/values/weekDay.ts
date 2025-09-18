import {
  convertIcsWeekDay,
  type ParseWeekDay,
  type IcsWeekdayNumber,
  weekDays,
} from "ts-ics";
import { z } from "zod";

export const zIcsWeekDay = z.enum(weekDays);

export const zIcsWeekdayNumber: z.ZodType<IcsWeekdayNumber, IcsWeekdayNumber> =
  z.object({
    day: zIcsWeekDay,
    occurrence: z.number().optional(),
  });

export const parseIcsWeekDay: ParseWeekDay = (...props) =>
  convertIcsWeekDay(zIcsWeekDay, ...props);
