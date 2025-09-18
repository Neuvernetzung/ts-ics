import type { ConvertLineType, ParseLineType } from "../parse";

export const weekDays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"] as const;

export type IcsWeekDays = typeof weekDays;
export type IcsWeekDay = IcsWeekDays[number];

export type ConvertWeekDay = ConvertLineType<IcsWeekDay>;

export type ParseWeekDay = ParseLineType<IcsWeekDay>;

export type IcsWeekdayNumber = {
  day: IcsWeekDay;
  occurrence?: number;
};

export type WeekDayNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type ConvertWeekDayNumber = ConvertLineType<IcsWeekdayNumber>;

export type ParseWeekDayNumber = ParseLineType<IcsWeekdayNumber>;
