import { z } from "zod";

export const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

export type WeekDays = typeof weekDays;
export type WeekDay = WeekDays[number];

export type WeekdayNumberObject = {
  day: WeekDay;
  occurence?: number;
};

export const zWeekdayNumberObject: z.ZodType<WeekdayNumberObject> = z.object({
  day: z.enum(weekDays),
  occurence: z.number().optional(),
});

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
