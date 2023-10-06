import { z } from "zod";

export const weekDays = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"] as const;

export type WeekDays = typeof weekDays;
export type WeekDay = WeekDays[number];

export type WeekdayNumberObject = z.infer<typeof zWeekdayNumberObject>;

export const zWeekdayNumberObject = z.object({
  day: z.enum(weekDays),
  occurence: z.number().optional(),
});
