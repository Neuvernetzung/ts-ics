export const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

export type WeekDays = typeof weekDays;
export type WeekDay = WeekDays[number];

export type WeekdayNumberObject = {
  day: WeekDay;
  occurence?: number;
};

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
