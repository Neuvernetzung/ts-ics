import { weekDays, zWeekDay, type WeekDay } from "@/types";

export type ParseIcsWeekDay = (weekDayString: string) => WeekDay | undefined;

export const icsWeekDayStringToWeekDay: ParseIcsWeekDay = (weekDayString) => {
  if (!weekDayString) return;

  if (weekDays.includes(weekDayString as WeekDay))
    return weekDayString as WeekDay;

  return;
};

export const parseIcsWeekDay: ParseIcsWeekDay = (WeekDayString) =>
  zWeekDay.parse(icsWeekDayStringToWeekDay(WeekDayString));
