import { LineToObject, ParseLineType } from "./parse";

export const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

export type WeekDays = typeof weekDays;
export type WeekDay = WeekDays[number];

export type WeekDayLineToWeekDay = LineToObject<WeekDay>;

export type ParseWeekDay = ParseLineType<WeekDay>;

export type WeekdayNumberObject = {
  day: WeekDay;
  occurence?: number;
};

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type WeekDayNumberLineToObject = LineToObject<WeekdayNumberObject>;

export type ParseWeekDayNumber = ParseLineType<WeekdayNumberObject>;
