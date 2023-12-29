import { WeekdayNumberObject } from "@/types/weekday";

export const generateIcsWeekdayNumber = (value: WeekdayNumberObject) => {
  if (value.occurence) {
    return `${value.occurence}${value.day}`;
  }

  return value.day;
};
