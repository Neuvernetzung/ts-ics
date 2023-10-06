import {
  zWeekdayNumberObject,
  type WeekDay,
  type WeekdayNumberObject,
} from "@/types/weekday";

export const icsWeekdayNumberToObject = (
  weekdayNumberString: string
): WeekdayNumberObject => {
  const isWeekdayOnly = weekdayNumberString.length === 2;

  if (isWeekdayOnly) return { day: weekdayNumberString as WeekDay };

  const occurence = weekdayNumberString.slice(0, -2);
  const day = weekdayNumberString.replace(occurence, "");

  return { day: day as WeekDay, occurence: Number(occurence) };
};

export const parseIcsWeekdayNumber = (weekdayNumberString: string) =>
  zWeekdayNumberObject.parse(icsWeekdayNumberToObject(weekdayNumberString));
