import { z } from "zod";

export const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

export type WeekDays = typeof weekDays;
export type WeekDay = WeekDays[number];

export const WeekDayOrdinal = weekDays.reduce(
  (prev, curr, index) => {
    // eslint-disable-next-line no-param-reassign
    prev[curr] = index as 0 | 1 | 2 | 3 | 4 | 5 | 6;
    return prev;
  },
  {} as Record<WeekDay, 0 | 1 | 2 | 3 | 4 | 5 | 6>,
);

export type WeekdayNumberObject = {
  day: WeekDay;
  occurence?: number;
};

export const zWeekdayNumberObject: z.ZodType<WeekdayNumberObject> = z.object({
  day: z.enum(weekDays),
  occurence: z.number().optional(),
});
