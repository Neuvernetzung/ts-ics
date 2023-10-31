import { getDayOfYear, getDaysInMonth } from "date-fns";

export const getMonthLength = (year: number, month: number) =>
  getDaysInMonth(new Date(year, month));

export const getYearLength = (year: number) => getDaysInMonth(new Date(year));

export const getDayOfTheYear = (year: number, month: number, day: number) =>
  getDayOfYear(new Date(year, month, day));

export type DateRecurrenceIterator = {
  next: () => Date | undefined;
  hasNext: () => boolean;
};

export const valuesDateRecurrenceIterator = (
  dates: Date[],
): DateRecurrenceIterator => {
  let i = 0;
  return {
    hasNext: () => i < dates.length - 1,
    next: () => {
      const date = dates[i];
      i += 1;

      return date;
    },
  };
};
