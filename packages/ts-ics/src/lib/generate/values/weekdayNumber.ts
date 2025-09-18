import type { IcsWeekdayNumber } from "@/types/values/weekday";

export const generateIcsWeekdayNumber = (value: IcsWeekdayNumber) => {
  if (value.occurrence) {
    return `${value.occurrence}${value.day}`;
  }

  return value.day;
};
